import { gql } from "@apollo/client";

const LOAD_TIMETABLE_SESSIONS = gql`
  query timetable_sessions {
    timetable_sessions {
      id
      session_name
      start_time
      end_time
    }
  }
`;

const LOAD_TT_STUDY_TIME_ALIASES = gql`
  query tt_studytime_aliases {
    tt_studytime_aliases {
      id
      alias
      study_times {
        id
        study_time_title
      }
      days {
        id
        name
      }
      description
    }
  }
`;

const LOAD_TIMETABLE_ENTRIES = gql`
  query timetableEntries($payload: TimetableEntryPayload!) {
    timetableEntries(payload: $payload) {
      entry_id
      day
      day_name
      lecturer_id
      lecturer_name
      room_id
      room_name
      session_id
      session_name
      start_time
      end_time
      course_units {
        id
        course_unit_code
        course_unit_title
        course_version {
        id
        version_title
        course {
          id
          course_code
          course_title
        }
      }
      }
    }
  }
`;

const GET_COURSE_UNITS = gql`
  query get_course_units($payload: String!) {
    get_course_units(payload: $payload) {
      id
      course_unit_code
      course_unit_title
      course_version {
        id
        version_title
        course {
          id
          course_code
          course_title
        }
      }
    }
  }
`;

export {
  LOAD_TIMETABLE_SESSIONS,
  LOAD_TT_STUDY_TIME_ALIASES,
  LOAD_TIMETABLE_ENTRIES,
  GET_COURSE_UNITS,
};
