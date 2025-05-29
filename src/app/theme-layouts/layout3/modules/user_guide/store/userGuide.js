import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialState = {
  activeTab: 0,
};

export const userGuideSlice = createSlice({
  name: "user_guide",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },

  selectors: {
    selectActiveTab: (state) => state.activeTab,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(userGuideSlice);
const injectedSlice = userGuideSlice.injectInto(rootReducer);
export const { setActiveTab } = userGuideSlice.actions;
export const { selectActiveTab } = injectedSlice.selectors;
export default userGuideSlice.reducer;
