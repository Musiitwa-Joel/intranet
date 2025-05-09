import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialStdInfoReqs = {
  campus: "",
  intake: "",
  acc_yr: "",
};

const _allInfoReqs = {
  campuses: [],
  intakes: [],
  acc_yrs: [],
};

const initialState = {
  activeTab: 0,
  layout: "list",
  showInfoModal: false,
  activeMenuItem: "1",
  activeBioDataTab: "academic_info",
  studentSearchModalVisible: false,
  stdInfoReqs: initialStdInfoReqs,
  allStudentCourses: [],
  userFilteredCourses: [],
  stdInfoExpandedItems: [],
  selectedStdInfoItem: null,
  allInfoReqs: _allInfoReqs,
  students: [],
  loadingStudents: false,
  reloadStudents: false,
  reloadStdCourses: false,
  selectedStudent: null,
  addStudentModalVisible: false,
  uploadStudentsModalVisible: false,
  addCandidateModalVisible: false,
  candidates: [], // This will store all candidates
  filteredCandidates: [], // This will store filtered candidates based on search
  searchTerm: "",
};
/**
 * The File Manager App slice.
 */
export const infoCenterSlice = createSlice({
  name: "elections",
  initialState,
  reducers: {
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setShowInfoModal: (state, action) => {
      state.showInfoModal = action.payload;
    },
    setActiveMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    setActiveBioDataTab: (state, action) => {
      state.activeBioDataTab = action.payload;
    },
    setStudentSearchModalVisible: (state, action) => {
      state.studentSearchModalVisible = action.payload;
    },
    setStdInfoReqs: (state, action) => {
      const { campus, intake, acc_yr } = action.payload;
      if (campus) {
        state.stdInfoReqs.campus = action.payload.campus;
      }

      if (intake) {
        state.stdInfoReqs.intake = action.payload.intake;
      }

      if (acc_yr) {
        state.stdInfoReqs.acc_yr = action.payload.acc_yr;
      }
    },
    setAllStudentCourses: (state, action) => {
      state.allStudentCourses = action.payload;
    },
    setUserFilteredCourses: (state, action) => {
      state.userFilteredCourses = action.payload;
    },
    setStdInfoExpandedItems: (state, action) => {
      state.stdInfoExpandedItems = action.payload;
    },
    setSelectedStdInfoItem: (state, action) => {
      state.selectedStdInfoItem = action.payload;
    },
    setAllInfoReqs: (state, action) => {
      state.allInfoReqs = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setLoadingStudents: (state, action) => {
      state.loadingStudents = action.payload;
    },
    setReloadStudents: (state, action) => {
      state.reloadStudents = action.payload;
    },
    setReloadStdCourses: (state, action) => {
      state.reloadStdCourses = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    setAddStudentModalVisible: (state, action) => {
      state.addStudentModalVisible = action.payload;
    },
    setUploadStudentsModalVisible: (state, action) => {
      state.uploadStudentsModalVisible = action.payload;
    },

    // New reducers for candidate functionality
    setAddCandidateModalVisible: (state, action) => {
      state.addCandidateModalVisible = action.payload;
    },

    addCandidate: (state, action) => {
      console.log("Adding candidate to Redux store:", action.payload);

      // Check if this is an update (edit) operation
      const existingIndex = state.candidates.findIndex(
        (c) => c.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Update existing candidate
        state.candidates[existingIndex] = action.payload;
      } else {
        // Add new candidate
        state.candidates.push(action.payload);
      }

      // Update filtered candidates
      state.filteredCandidates = [...state.candidates];
      // Update students array to show in StudentList
      state.students = [...state.candidates];
      console.log("Updated students array:", state.students);
    },

    searchCandidates: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;

      if (!searchTerm) {
        state.filteredCandidates = [...state.candidates];
        state.students = [...state.candidates]; // Update students array to show in StudentList
        return;
      }

      const filtered = state.candidates.filter(
        (candidate) =>
          candidate.student_no.toLowerCase().includes(searchTerm) ||
          (candidate.biodata.surname &&
            candidate.biodata.surname.toLowerCase().includes(searchTerm)) ||
          (candidate.biodata.other_names &&
            candidate.biodata.other_names.toLowerCase().includes(searchTerm)) ||
          (candidate.party &&
            candidate.party.toLowerCase().includes(searchTerm)) ||
          (candidate.course.course_code &&
            candidate.course.course_code.toLowerCase().includes(searchTerm))
      );

      state.filteredCandidates = filtered;
      state.students = filtered; // Update students array to show in StudentList
    },

    reloadCandidates: (state) => {
      // In a real app, this would fetch from an API
      // For now, just reset the filtered list to show all candidates
      state.filteredCandidates = [...state.candidates];
      state.students = [...state.candidates]; // Update students array to show in StudentList
      state.searchTerm = "";
    },
  },
  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectLayout: (state) => state.layout,
    selectShowInfoModal: (state) => state.showInfoModal,
    selectActiveMenuItem: (state) => state.activeMenuItem,
    selectActiveBioDataTab: (state) => state.activeBioDataTab,
    selectStudentSearchModalVisible: (state) => state.studentSearchModalVisible,
    selectStdInfoReqs: (state) => state.stdInfoReqs,
    selectAllStudentCourses: (state) => state.allStudentCourses,
    selectUserFilteredCourses: (state) => state.userFilteredCourses,
    selectStdInfoExpandedItems: (state) => state.stdInfoExpandedItems,
    selectSelectedStdInfoItem: (state) => state.selectedStdInfoItem,
    selectallInfoReqs: (state) => state.allInfoReqs,
    selectStudents: (state) => state.students,
    selectLoadingStudents: (state) => state.loadingStudents,
    selectReloadStudents: (state) => state.reloadStudents,
    selectReloadStdCourses: (state) => state.reloadStdCourses,
    selectSelectedStudent: (state) => state.selectedStudent,
    selectAddStudentModalVisible: (state) => state.addStudentModalVisible,
    selectUploadStudentsModalVisible: (state) =>
      state.uploadStudentsModalVisible,

    // New selectors for candidate functionality
    selectAddCandidateModalVisible: (state) => state.addCandidateModalVisible,
    selectCandidates: (state) => state.candidates,
    selectFilteredCandidates: (state) => state.filteredCandidates,
    selectSearchTerm: (state) => state.searchTerm,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(infoCenterSlice);
const injectedSlice = infoCenterSlice.injectInto(rootReducer);
export const {
  setLayout,
  updateActiveTab,
  setShowInfoModal,
  setActiveMenuItem,
  setActiveBioDataTab,
  setStudentSearchModalVisible,
  setStdInfoReqs,
  setAllStudentCourses,
  setUserFilteredCourses,
  setStdInfoExpandedItems,
  setSelectedStdInfoItem,
  setAllInfoReqs,
  setActiveTab,
  setStudents,
  setLoadingStudents,
  setReloadStudents,
  setReloadStdCourses,
  setSelectedStudent,
  setAddStudentModalVisible,
  setUploadStudentsModalVisible,

  // New action exports
  setAddCandidateModalVisible,
  addCandidate,
  searchCandidates,
  reloadCandidates,
} = infoCenterSlice.actions;
export const {
  selectLayout,
  selectShowInfoModal,
  selectActiveMenuItem,
  selectActiveBioDataTab,
  selectStudentSearchModalVisible,
  selectStdInfoReqs,
  selectAllStudentCourses,
  selectUserFilteredCourses,
  selectStdInfoExpandedItems,
  selectSelectedStdInfoItem,
  selectallInfoReqs,
  selectActiveTab,
  selectStudents,
  selectLoadingStudents,
  selectReloadStudents,
  selectReloadStdCourses,
  selectSelectedStudent,
  selectAddStudentModalVisible,
  selectUploadStudentsModalVisible,

  // New selector exports
  selectAddCandidateModalVisible,
  selectCandidates,
  selectFilteredCandidates,
  selectSearchTerm,
} = injectedSlice.selectors;
export default infoCenterSlice.reducer;
