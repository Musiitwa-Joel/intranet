import { gql } from "@apollo/client";

const LOAD_CLEARANCE_STUDENTS_SUMMARY = gql`
  query load_clearance_students_summary(
    $sectionId: String!
    $accYrId: String!
    $campusId: String!
    $schoolId: String!
    $intakeId: String!
  ) {
    load_clearance_students_summary(
      section_id: $sectionId
      acc_yr_id: $accYrId
      campus_id: $campusId
      school_id: $schoolId
      intake_id: $intakeId
    ) {
      campus_id
      campus_title
      course_code
      course_id
      course_title
      student_count
      section_id
    }
  }
`;

const LOAD_CLEARANCE_STUDENTS = gql`
  query Load_clearance_students(
    $start: Int!
    $limit: Int!
    $sectionId: String
    $courseId: String
    $campusId: String
  ) {
    load_clearance_students(
      start: $start
      limit: $limit
      section_id: $sectionId
      course_id: $courseId
      campus_id: $campusId
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
        intake_title
        study_time_title
        status
        acc_yr_title
        date
        created_on
        section_id
        cleared_by
        cleared_by_user
        rejection_logs {
          clearance_id
          reject_reason
          rejected_at
          rejected_by
          rejected_by_user
        }
      }
    }
  }
`;

const GLOBAL_SEARCH_APPLICATIONS = gql`
  query global_search_applications(
    $searchCriteria: String!
    $searchValue: String!
    $admissionsId: String
    $admitted: Boolean
    $start: Int!
    $limit: Int!
  ) {
    global_search_applications(
      search_criteria: $searchCriteria
      search_value: $searchValue
      admissions_id: $admissionsId
      admitted: $admitted
      start: $start
      limit: $limit
    ) {
      total_records
      students {
        std_id
        student_no
        registration_no
        form_no
        campus_id
        campus_title
        study_time_id
        study_time_title
        intake_id
        intake_title
        biodata {
          id
          surname
          other_names
          email
          nationality {
            id
            nationality_title
            nationality_category
          }
          gender
        }
        course {
          id
          course_code
        }
        entry_study_yr
        admitted_on
        admitted_by_user
        is_std_verified
        is_resident
      }
    }
  }
`;

const GLOBAL_SEARCH = gql`
  query global_search(
    $searchCriteria: String!
    $searchValue: String!
    $admissionsId: String
    $admitted: Boolean
    $start: Int!
    $limit: Int!
  ) {
    global_search(
      search_criteria: $searchCriteria
      search_value: $searchValue
      admissions_id: $admissionsId
      admitted: $admitted
      start: $start
      limit: $limit
    ) {
      total_records
      applications {
        id
        form_no
        is_admitted
        is_completed
        running_admissions {
          id
          scheme {
            scheme_title
          }
          intake {
            intake_title
          }
          acc_yr {
            acc_yr_title
          }
          admission_level {
            id
            admission_level_title
          }
          start_date
          end_date
        }
        status
        is_paid
        creation_date
        application_fee
        applicant {
          id
          surname
          other_names
          gender
          email
        }
        program_choices {
          id
          choice_no
          course {
            course_code
            course_title
          }
          course_id
        }
        std_id
      }
    }
  }
`;

export {
  LOAD_CLEARANCE_STUDENTS_SUMMARY,
  LOAD_CLEARANCE_STUDENTS,
  GLOBAL_SEARCH_APPLICATIONS,
  GLOBAL_SEARCH,
};
