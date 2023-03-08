/** Libraries */
import { createSlice } from "@reduxjs/toolkit";

/** Interface */
import { UiState } from "../../interfaces/slices/uiSlice.interface";

export const uiSlice = createSlice({
  name: "auth",
  initialState: {
    progressBackdrop: false,
    newPostsAlert: {
      status: false,
      quantity: 0,
    },
  } as UiState,
  reducers: {
    uiSetNewPostsAlert: (state) => {
      state.newPostsAlert = {
        status: true,
        quantity: state.newPostsAlert.quantity + 1,
      };
    },
    uiRemoveNewPostsAlert: (state) => {
      state.newPostsAlert = {
        status: false,
        quantity: 0,
      };
    },
    uiOpenProgressBackdrop: (state) => {
      state.progressBackdrop = true;
    },
    uiCloseProgressBackdrop: (state) => {
      state.progressBackdrop = false;
    },
    uiLogout: (state) => {
      state.progressBackdrop = false;
    },
  },
});

export const {
  uiSetNewPostsAlert,
  uiRemoveNewPostsAlert,
  uiOpenProgressBackdrop,
  uiCloseProgressBackdrop,
  uiLogout,
} = uiSlice.actions;
