/** Libraries */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Interface */
import { AuthState } from '../../interfaces/slices/authSlice.interface';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        checking: true,
        _id: '',
        name: '',
        username: '',
        email: '',
        description: '',
        posts: [],
        friends: [],
        groups: [],
        individualRooms: [],
        likedPosts: [],
        online: true,
    } as AuthState,
    reducers: {
        authLogin: (state, action: PayloadAction<Omit<AuthState, 'checking'>>) => {
            state.checking = false;
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.description = action.payload.description;
            state.posts = action.payload.posts;
            state.friends = action.payload.friends;
            state.groups = action.payload.groups;
            state.individualRooms = action.payload.individualRooms;
            state.likedPosts = action.payload.likedPosts;
            state.online = action.payload.online;
        },
        authCheckingFinish: (state) => {

            state.checking = false;
        },
        authLogout: (state) => {

            state.checking = false;
            state._id = '';
            state.name = '';
            state.username = '';
            state.email = '';
            state.description = '';
            state.posts = [];
            state.friends = [];
            state.groups = [];
            state.individualRooms = [];
            state.likedPosts = [];
            state.online = true;
        },
    },
});

export const { authLogin, authCheckingFinish, authLogout } = authSlice.actions;
export const authState = authSlice.getInitialState();