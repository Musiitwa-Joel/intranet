import { gql } from "@apollo/client";

const SAVE_RESULTS_CONFIG = gql`
  mutation SaveResultsConfig($payload: ResultsConfigInput!) {
    saveResultsConfig(payload: $payload) {
      message
      success
    }
  }
`;

export { SAVE_RESULTS_CONFIG };
