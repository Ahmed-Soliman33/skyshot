import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuVisible: false,
    servicesDropdownVisible: false,
    loading: false,
    error: {
      status: false,
      message: "",
    },
  },
  reducers: {
    toggleHeaderMenu(state) {
      state.menuVisible = !state.menuVisible;
    },
    showServicesDropdown(state) {
      state.servicesDropdownVisible = !state.servicesDropdownVisible;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error.status = action.payload.status;
      state.error.message = action.payload.message;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
