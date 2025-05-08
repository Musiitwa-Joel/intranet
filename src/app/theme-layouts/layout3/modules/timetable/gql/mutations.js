import { gql } from "@apollo/client";

const SAVE_TIMETABLE_SESSION = gql`
  mutation saveTimeTableSession($payload: TimeTableSesssionInput) {
    saveTimeTableSession(payload: $payload) {
      message
      success
    }
  }
`;

const DELETE_TIMETABLE_SESSION = gql`
  mutation deleteTimeTableSession($deleteTimeTableSessionId: ID!) {
    deleteTimeTableSession(id: $deleteTimeTableSessionId) {
      message
      success
    }
  }
`;

const SAVE_TT_STUDY_TIMES_ALIAS = gql`
  mutation saveTTStudyTimeAlias($payload: TTStudyTimeAliasInput) {
    saveTTStudyTimeAlias(payload: $payload) {
      message
      success
    }
  }
`;

const DELETE_TT_STUDYTIME_ALIAS = gql`
  mutation deleteTTStudyTimeAlias($deleteTtStudyTimeAliasId: ID!) {
    deleteTTStudyTimeAlias(id: $deleteTtStudyTimeAliasId) {
      message
      success
    }
  }
`;

const SAVE_TIMETABLE_ENTRY = gql`
  mutation saveTimetableEntry($payload: TimetableEntryInput) {
    saveTimetableEntry(payload: $payload) {
      message
      success
    }
  }
`;

const DELETE_TIMETABLE_ENTRY = gql`
  mutation deleteTimetableEntry($entryId: ID!) {
    deleteTimetableEntry(entry_id: $entryId) {
      message
      success
    }
  }
`;

export {
  SAVE_TIMETABLE_SESSION,
  DELETE_TIMETABLE_SESSION,
  SAVE_TT_STUDY_TIMES_ALIAS,
  DELETE_TT_STUDYTIME_ALIAS,
  SAVE_TIMETABLE_ENTRY,
  DELETE_TIMETABLE_ENTRY,
};
