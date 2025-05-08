import { gql } from "@apollo/client";

const GLOBAL_SEARCH_CLEARANCE_STUDENTS = gql`
  query global_search_clearance_students(
    $searchCriteria: String!
    $searchValue: String!
    $sectionId: String!
    $start: Int!
    $limit: Int!
  ) {
    global_search_clearance_students(
      search_criteria: $searchCriteria
      search_value: $searchValue
      section_id: $sectionId
      start: $start
      limit: $limit
    ) {
      total_records
      results {
        id
        student_name
        student_no
        course_code
        course_title
        gender
        campus_title
        study_time_title
        intake_title
        status
        acc_yr_title
        date
        created_on
        section_id
        cleared_by
        cleared_by_user
        digital_copies_match
        original_documents_verified
        rejection_logs {
          clearance_id
          reject_reason
          rejected_at
          rejected_by
          rejected_by_user
        }
        attachments {
          id
          section_id
          file_id
          file_name
          description
          url
          original_presented
          verified
        }
      }
    }
  }
`;

const GET_CLEARANCE_STATISTICS = gql`
  query Get_graduation_clearance_statistics(
    $accYrId: String!
    $campusId: String!
    $intakeId: String!
    $studyTimeId: String!
  ) {
    get_graduation_clearance_statistics(
      acc_yr_id: $accYrId
      campus_id: $campusId
      intake_id: $intakeId
      study_time_id: $studyTimeId
    ) {
      total_cleared_students
      total_pending_students
      total_qualified_students
      total_rejected_students
    }
    get_graduation_clearance_statistics_by_course(
      acc_yr_id: $accYrId
      campus_id: $campusId
      intake_id: $intakeId
      study_time_id: $studyTimeId
    ) {
      course_code
      course_id
      course_title
      school_code
      school_id
      school_title
      total_cleared
      total_pending
      total_qualified
      total_rejected
    }
  }
`;

const DOWNLOAD_GRADUATION_LIST = gql`
  query Query(
    $accYrId: String!
    $campusId: String!
    $intakeId: String!
    $studyTimeId: String!
    $format: String!
  ) {
    download_graduation_clearance_statistics(
      acc_yr_id: $accYrId
      campus_id: $campusId
      intake_id: $intakeId
      study_time_id: $studyTimeId
      format: $format
    )
  }
`;

export {
  GLOBAL_SEARCH_CLEARANCE_STUDENTS,
  GET_CLEARANCE_STATISTICS,
  DOWNLOAD_GRADUATION_LIST,
};
