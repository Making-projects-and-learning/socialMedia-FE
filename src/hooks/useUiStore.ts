/** Libraries */
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Store */
import type { RootState, AppDispatch } from "../store";

/** Redux toolkit - Slices */
import {
  uiSetNewPostsAlert,
  uiRemoveNewPostsAlert,
  uiCloseProgressBackdrop,
  uiOpenProgressBackdrop,
  uiOpenLikeNotification,
  uiCloseLikeNotification,
} from "../store/slices/ui.slice";

export const useUiStore = () => {
  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { progressBackdrop, newPostsAlert, likeNotification } = useAppSelector(
    (state) => state.ui
  );

  /** Notifications */
  const startUiOpenLikeNotification = (owner_name: string) => {
    dispatch(uiOpenLikeNotification(owner_name));
  };

  const startUiCloseLikeNotification = () => {
    dispatch(uiCloseLikeNotification());
  };

  /** New posts available alert */
  const startUiSetNewPostsAlert = () => {
    dispatch(uiSetNewPostsAlert());
  };

  const startUiRemoveNewPostsAlert = () => {
    dispatch(uiRemoveNewPostsAlert());
  };

  /** Loader with the backdrop */
  const startUiOpenProgressBackdrop = () => {
    dispatch(uiOpenProgressBackdrop());
  };

  const startUiCloseProgressBackdrop = () => {
    dispatch(uiCloseProgressBackdrop());
  };

  return {
    //* Propiedades
    newPostsAlert,
    progressBackdrop,
    likeNotification,

    //* Métodos
    startUiOpenLikeNotification,
    startUiCloseLikeNotification,
    startUiSetNewPostsAlert,
    startUiRemoveNewPostsAlert,
    startUiOpenProgressBackdrop,
    startUiCloseProgressBackdrop,
  };
};
