/** Libraries */
import { createSlice } from '@reduxjs/toolkit';

/** Interface */
import { UiState } from '../../interfaces/slices/uiSlice.interface';

export const uiSlice = createSlice({
    name: 'auth',
    initialState: {
        progressBackdrop: false
    } as UiState,
    reducers: {
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

export const { uiOpenProgressBackdrop, uiCloseProgressBackdrop, uiLogout } = uiSlice.actions;