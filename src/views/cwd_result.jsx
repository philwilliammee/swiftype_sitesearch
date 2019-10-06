import PropTypes from "prop-types";
import React from "react";

const CWDResultView = (props)=>{
  const {
    title,
    url,
    fields,
    refKey
  } = props
  return (
    <div className="card event-node" key={refKey}>
      <div className="events">
          <a
              href={url}
              className="group-link-wrapper field-group-link"
          >
              <div className="field title">
                  <h3 dangerouslySetInnerHTML={{ __html: title}} />
              </div>
              <div className="field meta">
                  <p>
                      <span className="inline-events-type">{fields["content-type"]}</span>
                  </p>
              </div>
              <div className="field field-name-summary summary">
                  <p>
                      {
                          fields.image ? <img className="thumbnail" src={fields.image} alt=""></img> : ''
                      }
                      <span dangerouslySetInnerHTML={{ __html: fields.body }} />
                  </p>
              </div>
          </a>
      </div>
  </div>
  )
}

CWDResultView.propTypes = {
    fields: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    refKey : PropTypes.string.isRequired,
};

export default CWDResultView;
