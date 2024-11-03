import { createSlice } from "@reduxjs/toolkit";
import _ from "@lodash";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialProgrammeFormState = {
  id: null,
  course_code: "",
  course_title: "",
  course_version: "",
  course_duration: "",
  duration_measure: "",
  course_head_id: "",
  campuses: [],
  entry_yrs: [],
  college_id: "",
  school_id: "",
  department_id: "",
  level: "",
  award: "",
  grading_id: "",
  study_times: [],
  course_version_id: "",
  isShortCourse: false,
};

const initialState = {
  activeTab: 0,
  allProgrammes: [],
  filteredProgrammes: [],
  expandedItems: [],
  createProgrammeModalOpen: false,
  createProgrammeReqs: {
    awards: [],
    campuses: [],
    colleges: [],
    levels: [],
    staff_members: [],
    grading: [],
    study_times: [],
  },
  createModuleModalOpen: false,
  programmeFormDetails: initialProgrammeFormState,
  uploadProgrammesModalOpen: false,
  downloadProgrammesModalOpen: false,
  allCourses: [],
  addVersionModalOpen: false,
  selectedTreeItemId: "",
  reloadCourses: false,
  selectedItem: null,
  selectedCourseVersion: null,
  courseVersionToEdit: null,
  courseUnits: [],
  loadingCourseUnits: false,
  groupedData: [],
  defaultExpandedModuleRowKeys: [],
  createNewCourse: false,
  courseVersionDetails: null,
  loadingCourseVersionDetails: false,
};

const progAndCoursesSlice = createSlice({
  name: "progAndCourses",
  initialState,
  reducers: {
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateAllProgrammes: (state, action) => {
      state.allProgrammes = action.payload;
    },
    updateExpandedItems: (state, action) => {
      state.expandedItems = action.payload;
    },
    updatecreateProgrammeModalOpen: (state, action) => {
      state.createProgrammeModalOpen = action.payload;
    },
    updateCreateModuleModalOpen: (state, action) => {
      state.createModuleModalOpen = action.payload;
    },
    updateCreateProgrammeReqs: (state, action) => {
      state.createProgrammeReqs = action.payload;
    },
    updateProgrammeFormDetails: (state, action) => {
      state.programmeFormDetails = action.payload;
    },
    resetProgrammeFormDetails: (state, action) => {
      state.programmeFormDetails = initialProgrammeFormState;
    },
    updateUploadProgrammesModalOpen: (state, action) => {
      state.uploadProgrammesModalOpen = action.payload;
    },
    updateDownloadProgrammesModalOpen: (state, action) => {
      state.downloadProgrammesModalOpen = action.payload;
    },
    updateAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    updateAddVersionModalOpen: (state, action) => {
      state.addVersionModalOpen = action.payload;
    },
    updateSelectedTreeItemId: (state, action) => {
      state.selectedTreeItemId = action.payload;
    },
    setReloadCourses: (state, action) => {
      state.reloadCourses = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setSelectedCourseVersion: (state, action) => {
      state.selectedCourseVersion = action.payload;
    },
    setCourseVersionToEdit: (state, action) => {
      state.courseVersionToEdit = action.payload;
    },

    setCourseUnits: (state, action) => {
      state.courseUnits = action.payload;
    },
    setLoadingCourseUnits: (state, action) => {
      state.loadingCourseUnits = action.payload;
    },
    setFilteredProgrammes: (state, action) => {
      state.loadingCourseUnits = action.payload;
    },
    setGroupedData: (state, action) => {
      state.groupedData = action.payload;
    },
    setDefaultExpandedModuleRowKeys: (state, action) => {
      state.defaultExpandedModuleRowKeys = action.payload;
    },
    setCreateNewCourse: (state, action) => {
      state.createNewCourse = action.payload;
    },
    setCourseVersionDetails: (state, action) => {
      state.courseVersionDetails = action.payload;
    },
    resetProgAndCoursesSlice: (state, action) => initialState,
  },

  selectors: {
    selectGroupedData: (state) => state.groupedData,
    selectDefaultExpandedModuleRowKeys: (state) =>
      state.defaultExpandedModuleRowKeys,
    selectSelectedCourseVersion: (state) => state.selectedCourseVersion,
    selectCreateNewCourse: (state) => state.createNewCourse,
    selectCourseVersionDetails: (state) => state.courseVersionDetails,
    selectProgrammeFormDetails: (state) => state.programmeFormDetails,
  },
});

/**
 * Lazy load
 * */
rootReducer.inject(progAndCoursesSlice);
const injectedSlice = progAndCoursesSlice.injectInto(rootReducer);
export const {
  updateActiveTab,
  resetProgAndCoursesSlice,
  updateAllProgrammes,
  updateExpandedItems,
  updatecreateProgrammeModalOpen,
  updateCreateModuleModalOpen,
  updateCreateProgrammeReqs,
  updateProgrammeFormDetails,
  resetProgrammeFormDetails,
  updateUploadProgrammesModalOpen,
  updateDownloadProgrammesModalOpen,
  updateAllCourses,
  updateAddVersionModalOpen,
  updateSelectedTreeItemId,
  setReloadCourses,
  setSelectedItem,
  setSelectedCourseVersion,
  setCourseVersionToEdit,
  setCourseUnits,
  setLoadingCourseUnits,
  setFilteredProgrammes,
  setGroupedData,
  setDefaultExpandedModuleRowKeys,
  setCreateNewCourse,
  setCourseVersionDetails,
} = progAndCoursesSlice.actions;

export const {
  selectGroupedData,
  selectDefaultExpandedModuleRowKeys,
  selectSelectedCourseVersion,
  selectCreateNewCourse,
  selectCourseVersionDetails,
  selectProgrammeFormDetails,
} = injectedSlice.selectors;

// export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default progAndCoursesSlice.reducer;
