import { gql } from "@apollo/client";

const UPLOAD_PROGRESS_SUBSCRIPTION = gql`
  subscription UploadProgress {
    uploadProgress {
      progress
    }
  }
`;

export { UPLOAD_PROGRESS_SUBSCRIPTION };
