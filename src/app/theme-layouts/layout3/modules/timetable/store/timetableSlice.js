import { SettingsSystemDaydreamSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialState = {
  activeTab: "timetable",
  activeTtSettingsTab: "sessions",
  selectedTTSession: null,
  selectedTTStudyTimeAlias: null,
  days: [],
  timetableEntries: [],
  timetableModalVisible: false,
  timetableFormInput: {
    campus_id: null,
    school_id: null,
    study_time_id: null,
    intake: null,
    year: null,
  },
  selectedTTDetails: {
    day: null,
    session: null
  }
};

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveTtSettingsTab: (state, action) => {
      state.activeTtSettingsTab = action.payload;
    },
    setSelectedTTSessions: (state, action) => {
      state.selectedTTSession = action.payload;
    },
    setSelectedTTStudyTimeAlias: (state, action) => {
      state.selectedTTStudyTimeAlias = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setTimetableEntries: (state, action) => {
      state.timetableEntries = action.payload;
    },
    setTimetableModalVisible: (state, action) => {
      state.timetableModalVisible = action.payload;
    },
    setTimetableFormInput: (state, action) => {
      state.timetableFormInput = action.payload;
    },
    setSelectedTTDetails: (state, action) => {
      state.selectedTTDetails = action.payload;
    },
  },

  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectActiveTtSettingsTab: (state) => state.activeTtSettingsTab,
    selectSelectedTTSession: (state) => state.selectedTTSession,
    selectSelectedTTStudyTimeAlias: (state) => state.selectedTTStudyTimeAlias,
    selectDays: (state) => state.days,
    selectTimetableEntries: (state) => state.timetableEntries,
    selectTimetableModalVisible: (state) => state.timetableModalVisible,
    selectTimetableFormInput: (state) => state.timetableFormInput,
    selectSelectedTTDetails: (state) => state.selectedTTDetails,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(timetableSlice);
const injectedSlice = timetableSlice.injectInto(rootReducer);
export const {
  setActiveTab,
  setActiveTtSettingsTab,
  setSelectedTTSessions,
  setSelectedTTStudyTimeAlias,
  setDays,
  setTimetableEntries,
  setTimetableModalVisible,
  setTimetableFormInput,
  setSelectedTTDetails
} = timetableSlice.actions;

export const {
  selectActiveTab,
  selectActiveTtSettingsTab,
  selectSelectedTTSession,
  selectSelectedTTStudyTimeAlias,
  selectDays,
  selectTimetableEntries,
  selectTimetableModalVisible,
  selectTimetableFormInput,
  selectSelectedTTDetails
} = injectedSlice.selectors;
export default timetableSlice.reducer;
