import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialState = {
  activeTab: "results_view",
  marksDetails: [],
  expandedMarksKeys: [],
};

export const resultsSlice = createSlice({
  name: "resultsMgt",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setMarksDetails: (state, action) => {
      state.marksDetails = action.payload;
    },
    setExpandedMarksKeys: (state, action) => {
      state.expandedMarksKeys = action.payload;
    },
  },

  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectMarksDetails: (state) => state.marksDetails,
    selectExpandedMarksKeys: (state) => state.expandedMarksKeys,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(resultsSlice);
const injectedSlice = resultsSlice.injectInto(rootReducer);
export const { setActiveTab, setMarksDetails, setExpandedMarksKeys } =
  resultsSlice.actions;

export const { selectActiveTab, selectMarksDetails, selectExpandedMarksKeys } =
  injectedSlice.selectors;
export default resultsSlice.reducer;
