import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices";

const initialState = {
  activeTab: 0,
  allRoles: [],
  createRoleModalVisible: false,
  selectedRole: null,
  editRoleModalVisible: false,
  deleteModalVisible: false,
  allIntranetModulesVisible: false,
  roleModules: [],
  loadingRoleModules: false,
  selectedPermissions: [],
  selectedUser: null,
};

export const systemAccessSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setAllRoles: (state, action) => {
      state.allRoles = action.payload;
    },
    setCreateRoleModalVisible: (state, action) => {
      state.createRoleModalVisible = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setEditRoleModalVisible: (state, action) => {
      state.editRoleModalVisible = action.payload;
    },
    setDeleteModalVisible: (state, action) => {
      state.deleteModalVisible = action.payload;
    },
    setAllIntranetModulesVisible: (state, action) => {
      state.allIntranetModulesVisible = action.payload;
    },
    setLoadingRoleModules: (state, action) => {
      state.loadingRoleModules = action.payload;
    },
    setRoleModules: (state, action) => {
      state.roleModules = action.payload;
    },
    setSelectedPermissions: (state, action) => {
      state.selectedPermissions = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },

  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectAllRoles: (state) => state.allRoles,
    selectCreateRoleModalVisible: (state) => state.createRoleModalVisible,
    selectSelectedRole: (state) => state.selectedRole,
    selectEditRoleModalVisible: (state) => state.editRoleModalVisible,
    selectDeleteModalVisible: (state) => state.deleteModalVisible,
    selectAllIntranetModulesVisible: (state) => state.allIntranetModulesVisible,
    selectLoadingRoleModules: (state) => state.loadingRoleModules,
    selectRoleModules: (state) => state.roleModules,
    selectSelectedPermissions: (state) => state.selectedPermissions,
    selectSelectedUser: (state) => state.selectedUser,
  },
});
/**
 * Lazy load
 * */
rootReducer.inject(systemAccessSlice);
const injectedSlice = systemAccessSlice.injectInto(rootReducer);
export const {
  setActiveTab,
  setAllRoles,
  setCreateRoleModalVisible,
  setSelectedRole,
  setEditRoleModalVisible,
  setDeleteModalVisible,
  setAllIntranetModulesVisible,
  setLoadingRoleModules,
  setRoleModules,
  setSelectedPermissions,
  setSelectedUser,
} = systemAccessSlice.actions;

export const {
  selectActiveTab,
  selectAllRoles,
  selectCreateRoleModalVisible,
  selectSelectedRole,
  selectEditRoleModalVisible,
  selectDeleteModalVisible,
  selectAllIntranetModulesVisible,
  selectLoadingRoleModules,
  selectRoleModules,
  selectSelectedPermissions,
  selectSelectedUser,
} = injectedSlice.selectors;
export default systemAccessSlice.reducer;
