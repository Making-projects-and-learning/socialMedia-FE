/** Libraries */
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Store Type */
import type { RootState, AppDispatch } from "../store";

/** Redux toolkit - Slices */
import {
  uiSetNewPostsAlert,
  uiRemoveNewPostsAlert,
  uiCloseProgressBackdrop,
  uiOpenProgressBackdrop,
} from "../store/slices/ui.slice";

export const useUiStore = () => {
  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { progressBackdrop, newPostsAlert } = useAppSelector(
    (state) => state.ui
  );

  const startUiSetNewPostsAlert = () => {
    dispatch(uiSetNewPostsAlert());
  };

  const startUiRemoveNewPostsAlert = () => {
    dispatch(uiRemoveNewPostsAlert());
  };

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

    //* Métodos
    startUiSetNewPostsAlert,
    startUiRemoveNewPostsAlert,
    startUiOpenProgressBackdrop,
    startUiCloseProgressBackdrop,
  };
};
