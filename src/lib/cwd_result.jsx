/**
 * This is CWD overide of default result view.
 * See https://github.com/elastic/search-ui/blob/master/packages/react-search-ui-views/src/Result.js
 * and https://github.com/elastic/search-ui for more info.
 */
import PropTypes from "prop-types";
import React from "react";
// import { appendClassName } from "@elastic/react-search-ui-views/es/view-helpers";
import { isFieldValueWrapper } from "@elastic/react-search-ui-views/es/types/FieldValueWrapper";
import CWDResultView from '../views/cwd_result'

function getFieldType(result, field, type) {
  if (result[field]) return result[field][type];
}

function getRaw(result, field) {
  return getFieldType(result, field, "raw");
}

function getSnippet(result, field) {
  return getFieldType(result, field, "snippet");
}

function htmlEscape(str) {
  if (!str) return "";

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getEscapedField(result, field) {
  // Fallback to raw values here, because non-string fields
  // will not have a snippet fallback. Raw values MUST be html escaped.
  const safeField =
    getSnippet(result, field) || htmlEscape(getRaw(result, field));
  return Array.isArray(safeField) ? safeField.join(", ") : safeField;
}

function getEscapedFields(result) {
  return Object.keys(result).reduce((acc, field) => {
    // If we receive an arbitrary value from the response, we may not properly
    // handle it, so we should filter out arbitrary values here.
    //
    // I.e.,
    // Arbitrary value: "_metaField: '1939191'"
    // vs.
    // FieldValueWrapper: "_metaField: {raw: '1939191'}"
    if (!isFieldValueWrapper(result[field])) return acc;
    return { ...acc, [field]: getEscapedField(result, field) };
  }, {});
}

function Result({
  className,
  result,
  onClickLink,
  titleField,
  urlField,
  debug,
  ...rest
}) {
  const refKey = {...rest}.key;
  const fields = getEscapedFields(result);
  const title = getEscapedField(result, titleField);
  const url = getRaw(result, urlField);
  // const resultClass = appendClassName("sui-result", className);
  return (
    <CWDResultView
      fields={fields}
      title={title}
      url={url}
      refKey={refKey}
    />
  )
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
  onClickLink: PropTypes.func.isRequired,
  className: PropTypes.string,
  titleField: PropTypes.string,
  urlField: PropTypes.string,
  debug: PropTypes.string,
};

export default Result;
