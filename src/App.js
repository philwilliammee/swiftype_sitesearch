import React from "react";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import SiteSearchAPIConnector from "@elastic/search-ui-site-search-connector";
import {
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
} from "@elastic/react-search-ui";
import CWD_Result from "./lib/cwd_result";

const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: "",
    direction: ""
  },
  {
    name: "Title",
    value: "title",
    direction: "asc"
  }
];

const connector = new SiteSearchAPIConnector({
  documentType: ['page'],
  engineName: 'it-cornell-dev',
  engineKey: "dvTsbLnFzExPyx1byYKx"
});

const config = {
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      "content-type": {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      url: {
        raw: {}
      },
      body: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      image: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      popularity: {
        snippet: {
          size: 100,
          fallback: true
        }
      }
    },
    facets: {
      "content-type": { type: "value"},
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        title: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        nps_link: {
          raw: {}
        }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["title"]
        }
      },
      size: 4
    }
  },
  apiConnector: connector
};

export default function App() {
  return (
    <SearchProvider config={config} >
      <div className="App">
        <Layout
          header={<SearchBox
            autocompleteMinimumCharacters={3}
            autocompleteResults={{
              linkTarget: "_blank",
              sectionTitle: "Results",
              titleField: "title",
              urlField: "url",
              shouldTrackClickThrough: true,
              clickThroughTags: ["test"]
            }}
            autocompleteSuggestions={true}
            debounceLength={0}
          />}
          bodyHeader={
            <React.Fragment>
              <PagingInfo />
              <ResultsPerPage />
            </React.Fragment>
          }
          bodyContent={
            <Results titleField="title"
              urlField="url"
              resultView={CWD_Result}
            />
          }
          sideContent={
            <div>
              <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
              <Facet
                field="content-type"
                label="Type"
                filterType="any"
                isFilterable={true}
              />
            </div>
          }
          bodyFooter={<Paging />}
        />
      </div>
    </SearchProvider>
  );
}
