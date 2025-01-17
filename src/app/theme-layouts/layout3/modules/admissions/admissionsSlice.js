import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialSchemeFormState = {
  id: null,
  scheme_title: "",
  description: "",
  isActive: false,
  added_by: "",
  modified_by: "",
  modified_on: "",
};

const initialAdmissionLevelFormState = {
  id: null,
  admission_level_title: "",
  prog_levels: null,
  admission_level_description: "",
  added_by: "",
  modified_by: "",
  modified_on: "",
};

const initialApplicantRequirements = {
  acc_yrs: [],
  schemes: [],
  intakes: [],
};

const _applicantFillForm = {
  acc_yr_id: "",
  scheme: "",
  intake: "",
};

const _admittedFillForm = {
  acc_yr_id: "",
  scheme: "",
  intake: "",
};

const initialState = {
  schemes: [],
  scheme: initialSchemeFormState,
  schemeToDelete: null,
  deleteSchemeDialogOpen: false,

  admission_levels: [],
  program_levels: [],
  admission_level: initialAdmissionLevelFormState,
  admissionLevelToDelete: null,
  deleteAdmissionLevelDialogOpen: false,

  startAdmissionsModalVisible: false,

  admissionSetupReqs: null,
  running_admissions: [],
  selectedRunningAdmission: null,
  deleteAdmissionDialogOpen: false,
  manageProgramsModalVisible: false,
  allCourses: [],
  advertisedCourses: [],
  selectedCourse: null,
  selectedCourseRight: null,
  advertisedCoursesInput: "",
  allCoursesInput: "",
  applicantRequirements: initialApplicantRequirements,
  applicantsSummary: [],
  admittedStdsSummary: [],
  selectedApplicantSummary: null,
  loadingApplications: false,
  loadingAdmittedStds: false,
  applications: [],
  admittedStds: [],
  selectedApplications: [],
  applicationPreviewModalOpen: false,
  applicationForm: null,
  admitStdsModalVisible: false,
  selectedRowKeys: [],
  applicantFillForm: _applicantFillForm,
  admittedFillForm: _admittedFillForm,
  selectedAdmittedStdSummary: null,
  selectedAdmittedStds: [],
  selectedAdmittedStdsRowKeys: [],
};
/**
 * The File Manager App slice.
 */
export const admissionsAppSlice = createSlice({
  name: "admissionsApp",
  initialState,
  reducers: {
    // scheme
    setSchemes: (state, action) => {
      state.schemes = action.payload;
    },
    setScheme: (state, action) => {
      state.scheme = action.payload;
    },
    setDeleteSchemeDialogOpen: (state, action) => {
      state.deleteSchemeDialogOpen = action.payload;
    },
    setSchemeToDelete: (state, action) => {
      state.schemeToDelete = action.payload;
    },

    setApplicantFillForm: (state, action) => {
      state.applicantFillForm = action.payload;
    },
    setAdmittedFillForm: (state, action) => {
      state.admittedFillForm = action.payload;
    },

    // admission levels
    setAdmissionLevels: (state, action) => {
      state.admission_levels = action.payload;
    },
    setProgrammeLevels: (state, action) => {
      state.program_levels = action.payload;
    },
    setAdmissionLevel: (state, action) => {
      state.admission_level = action.payload;
    },
    setDeleteAdmissionLevelDialogOpen: (state, action) => {
      state.deleteAdmissionLevelDialogOpen = action.payload;
    },
    setAdmissionLevelToDelete: (state, action) => {
      state.admissionLevelToDelete = action.payload;
    },

    // running admissions
    setStartAdmissionsModalVisible: (state, action) => {
      state.startAdmissionsModalVisible = action.payload;
    },
    setAdmissionSetUpReqs: (state, action) => {
      state.admissionSetupReqs = action.payload;
    },
    setRunningAdmissions: (state, action) => {
      state.running_admissions = action.payload;
    },
    setSelectedRunningAdmission: (state, action) => {
      state.selectedRunningAdmission = action.payload;
    },
    setDeleteAdmissionDialogOpen: (state, action) => {
      state.deleteAdmissionDialogOpen = action.payload;
    },
    setManageProgramsModalVisible: (state, action) => {
      state.manageProgramsModalVisible = action.payload;
    },
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    setAdvertisedCourses: (state, action) => {
      state.advertisedCourses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSelectedCourseRight: (state, action) => {
      state.selectedCourseRight = action.payload;
    },
    setAdvertisedCoursesInput: (state, action) => {
      state.advertisedCoursesInput = action.payload;
    },
    setAllCoursesInput: (state, action) => {
      state.allCoursesInput = action.payload;
    },

    loadInitialApplicantRequirements: (state, action) => {
      state.applicantRequirements = action.payload;
    },
    setApplicantsSummary: (state, action) => {
      state.applicantsSummary = action.payload;
    },
    setAdmittedStdsSummary: (state, action) => {
      state.admittedStdsSummary = action.payload;
    },
    setSelectedAdmittedStdsSummary: (state, action) => {
      state.selectedAdmittedStdSummary = action.payload;
    },
    setSelectedApplicantSummary: (state, action) => {
      state.selectedApplicantSummary = action.payload;
    },
    setLoadingApplications: (state, action) => {
      state.loadingApplications = action.payload;
    },
    setLoadingAdmittedStds: (state, action) => {
      state.loadingAdmittedStds = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setAdmittedStds: (state, action) => {
      state.admittedStds = action.payload;
    },
    setSelectedApplications: (state, action) => {
      state.selectedApplications = action.payload;
    },
    setSelectedAdmittedStds: (state, action) => {
      state.selectedAdmittedStds = action.payload;
    },
    setApplicationPreviewModalOpen: (state, action) => {
      state.applicationPreviewModalOpen = action.payload;
    },
    setApplicationForm: (state, action) => {
      state.applicationForm = action.payload;
    },
    setAdmitStdsModalVisible: (state, action) => {
      state.admitStdsModalVisible = action.payload;
    },
    setSelectedRowKeys: (state, action) => {
      state.selectedRowKeys = action.payload;
    },
    setSelectedAdmittedStdsRowKeys: (state, action) => {
      state.selectedAdmittedStdsRowKeys = action.payload;
    },
  },
  selectors: {
    selectSchemes: (state) => state.schemes,
    selectScheme: (state) => state.scheme,
    selectDeleteSchemeDialogOpen: (state) => state.deleteSchemeDialogOpen,
    selectSchemeToDelete: (state) => state.schemeToDelete,

    selectAdmissionLevels: (state) => state.admission_levels,
    selectProgramLevels: (state) => state.program_levels,
    selectAdmissionLevel: (state) => state.admission_level,
    selectDeleteAdmissionLevelDialogOpen: (state) =>
      state.deleteAdmissionLevelDialogOpen,
    selectAdmissionLevelToDelete: (state) => state.admissionLevelToDelete,

    selectStartAdmissionsModalVisible: (state) =>
      state.startAdmissionsModalVisible,

    selectAdmissionSetUpReqs: (state) => state.admissionSetupReqs,
    selectRunningAdmissions: (state) => state.running_admissions,
    selectRunningAdmission: (state) => state.selectedRunningAdmission,
    selectDeleteAdmissionDialogOpen: (state) => state.deleteAdmissionDialogOpen,
    selectManageProgramsModalVisible: (state) =>
      state.manageProgramsModalVisible,
    selectAllCourses: (state) => state.allCourses,
    selectSelectedCourse: (state) => state.selectedCourse,
    selectAdvertisedCourses: (state) => state.advertisedCourses,
    selectSelectedCourseRight: (state) => state.selectedCourseRight,
    selectAdvertisedCoursesInput: (state) => state.advertisedCoursesInput,
    selectAllCoursesInput: (state) => state.allCoursesInput,
    selectApplicantRequirements: (state) => state.applicantRequirements,
    selectApplicantsSummary: (state) => state.applicantsSummary,
    selectSelectedApplicantSummary: (state) => state.selectedApplicantSummary,
    selectLoadingApplications: (state) => state.loadingApplications,
    selectApplications: (state) => state.applications,
    selectSelectedApplications: (state) => state.selectedApplications,
    selectApplicationPreviewModalOpen: (state) =>
      state.applicationPreviewModalOpen,
    selectApplicationForm: (state) => state.applicationForm,
    selectAdmitStdsModalVisible: (state) => state.admitStdsModalVisible,
    selectSelectedRowKeys: (state) => state.selectedRowKeys,
    selectApplicantFillForm: (state) => state.applicantFillForm,
    selectAdmittedFillForm: (state) => state.admittedFillForm,
    selectAdmittedStdsSummary: (state) => state.admittedStdsSummary,
    selectSelectedAdmittedStdsSummary: (state) =>
      state.selectedAdmittedStdSummary,
    selectAdmittedStds: (state) => state.admittedStds,
    selectLoadingAdmittedStds: (state) => state.loadingAdmittedStds,
    selectSelectedAdmittedStds: (state) => state.selectedAdmittedStds,
    selectSelectedAdmittedStdsRowKeys: (state) =>
      state.selectedAdmittedStdsRowKeys,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(admissionsAppSlice);
const injectedSlice = admissionsAppSlice.injectInto(rootReducer);
export const {
  setSchemes,
  setScheme,
  setDeleteSchemeDialogOpen,
  setSchemeToDelete,
  setAdmissionLevels,
  setAdmissionLevel,
  setDeleteAdmissionLevelDialogOpen,
  setAdmissionLevelToDelete,
  setStartAdmissionsModalVisible,
  setAdmissionSetUpReqs,
  setRunningAdmissions,
  setSelectedRunningAdmission,
  setDeleteAdmissionDialogOpen,
  setProgrammeLevels,
  setManageProgramsModalVisible,
  setAllCourses,
  setSelectedCourse,
  setAdvertisedCourses,
  setSelectedCourseRight,
  setAdvertisedCoursesInput,
  setAllCoursesInput,
  loadInitialApplicantRequirements,
  setApplicantsSummary,
  setSelectedApplicantSummary,
  setLoadingApplications,
  setApplications,
  setSelectedApplications,
  setApplicationPreviewModalOpen,
  setApplicationForm,
  setAdmitStdsModalVisible,
  setSelectedRowKeys,
  setApplicantFillForm,
  setAdmittedFillForm,
  setAdmittedStdsSummary,
  setSelectedAdmittedStdsSummary,
  setAdmittedStds,
  setLoadingAdmittedStds,
  setSelectedAdmittedStds,
  setSelectedAdmittedStdsRowKeys,
} = admissionsAppSlice.actions;
export const {
  selectSchemes,
  selectScheme,
  selectDeleteSchemeDialogOpen,
  selectSchemeToDelete,
  selectAdmissionLevels,
  selectAdmissionLevel,
  selectDeleteAdmissionLevelDialogOpen,
  selectAdmissionLevelToDelete,
  selectStartAdmissionsModalVisible,
  selectAdmissionSetUpReqs,
  selectRunningAdmissions,
  selectRunningAdmission,
  selectDeleteAdmissionDialogOpen,
  selectProgramLevels,
  selectManageProgramsModalVisible,
  selectAllCourses,
  selectSelectedCourse,
  selectAdvertisedCourses,
  selectSelectedCourseRight,
  selectAdvertisedCoursesInput,
  selectAllCoursesInput,
  selectApplicantRequirements,
  selectApplicantsSummary,
  selectSelectedApplicantSummary,
  selectLoadingApplications,
  selectApplications,
  selectSelectedApplications,
  selectApplicationPreviewModalOpen,
  selectApplicationForm,
  selectAdmitStdsModalVisible,
  selectSelectedRowKeys,
  selectApplicantFillForm,
  selectAdmittedFillForm,
  selectAdmittedStdsSummary,
  selectSelectedAdmittedStdsSummary,
  selectAdmittedStds,
  selectLoadingAdmittedStds,
  selectSelectedAdmittedStds,
  selectSelectedAdmittedStdsRowKeys,
} = injectedSlice.selectors;
export default admissionsAppSlice.reducer;
