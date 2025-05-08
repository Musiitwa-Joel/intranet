import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialState = {
  activeTab: 0,
  clearanceFillForm: null,
  clearanceStdsSummary: [],
  selectedClearanceStdsSummary: null,
  clearanceStdsCurrentPage: 1,
  clearanceStdsSelectedRowKey: null,
  loadingClearanceStds: false,
  clearanceStds: [],
  clearanceStdsTotal: 0,
  clearanceDetailsModalVisible: false,
  selectedStudent: null,
};

export const registrationSlice = createSlice({
  name: "examinations",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setClearanceStdsSummary: (state, action) => {
      state.clearanceStdsSummary = action.payload;
    },
    setClearanceFillForm: (state, action) => {
      state.clearanceFillForm = action.payload;
    },
    setSelectedClearanceStdsSummary: (state, action) => {
      state.selectedClearanceStdsSummary = action.payload;
    },
    setClearanceStdsCurrentPage: (state, action) => {
      state.clearanceStdsCurrentPage = action.payload;
    },
    setClearanceStdsSelectedRowKey: (state, action) => {
      state.clearanceStdsSelectedRowKey = action.payload;
    },
    setLoadingClearanceStds: (state, action) => {
      state.loadingClearanceStds = action.payload;
    },
    setClearanceStds: (state, action) => {
      state.clearanceStds = action.payload;
    },
    setClearanceStdsTotal: (state, action) => {
      state.clearanceStdsTotal = action.payload;
    },
    setClearanceDetailsModalVisible: (state, action) => {
      state.clearanceDetailsModalVisible = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
  },

  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectClearanceStdsSummary: (state) => state.clearanceStdsSummary,
    selectClearanceFillForm: (state) => state.clearanceFillForm,
    selectSelectedClearanceStdsSummary: (state) =>
      state.selectedClearanceStdsSummary,
    selectClearanceStdsCurrentPage: (state) => state.clearanceStdsCurrentPage,
    selectClearanceStdsSelectedRowKey: (state) =>
      state.clearanceStdsSelectedRowKey,
    selectLoadingClearanceStds: (state) => state.loadingClearanceStds,
    selectClearanceStds: (state) => state.clearanceStds,
    selectClearanceStdsTotal: (state) => state.clearanceStdsTotal,
    selectClearanceDetailsModalVisible: (state) =>
      state.clearanceDetailsModalVisible,
    selectSelectedStudent: (state) => state.selectedStudent,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(registrationSlice);
const injectedSlice = registrationSlice.injectInto(rootReducer);
export const {
  setActiveTab,
  setClearanceStdsSummary,
  setClearanceFillForm,
  setSelectedClearanceStdsSummary,
  setClearanceStdsCurrentPage,
  setClearanceStdsSelectedRowKey,
  setLoadingClearanceStds,
  setClearanceStds,
  setClearanceStdsTotal,
  setClearanceDetailsModalVisible,
  setSelectedStudent,
} = registrationSlice.actions;

export const {
  selectActiveTab,
  selectClearanceStdsSummary,
  selectClearanceFillForm,
  selectSelectedClearanceStdsSummary,
  selectClearanceStdsCurrentPage,
  selectClearanceStdsSelectedRowKey,
  selectLoadingClearanceStds,
  selectClearanceStds,
  selectClearanceStdsTotal,
  selectClearanceDetailsModalVisible,
  selectSelectedStudent,
} = injectedSlice.selectors;
export default registrationSlice.reducer;
