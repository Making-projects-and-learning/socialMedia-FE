/** Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    likeNotification: {
      status: false,
      user: "",
    },
  } as UiState,
  reducers: {
    /** Like notification */
    uiOpenLikeNotification: (state, action: PayloadAction<string>) => {
      state.likeNotification = {
        status: true,
        user: action.payload,
      };
    },
    uiCloseLikeNotification: (state) => {
      state.likeNotification = {
        status: false,
        user: "",
      };
    },

    /** New posts available alert */
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

    /** Loader with progress backdrop */
    uiOpenProgressBackdrop: (state) => {
      state.progressBackdrop = true;
    },
    uiCloseProgressBackdrop: (state) => {
      state.progressBackdrop = false;
    },

    /** Logout */
    uiLogout: (state) => {
      state.progressBackdrop = false;
    },
  },
});

export const {
  uiOpenLikeNotification,
  uiCloseLikeNotification,
  uiSetNewPostsAlert,
  uiRemoveNewPostsAlert,
  uiOpenProgressBackdrop,
  uiCloseProgressBackdrop,
  uiLogout,
} = uiSlice.actions;
