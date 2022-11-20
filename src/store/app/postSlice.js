import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPendingPosts: true,
        isLoadingPublishedPosts: true,
        pendingPosts: [],
        publishedPosts: [],
        totalPendingPosts: 0,
        totalPublishedPosts: 0,
        activePost: null
    },
    reducers: {
        onSetActivePost: (state, {payload} ) => {
            state.activePost = payload;
        },
        onAddNewPendingPost: (state, {payload} ) => {
            state.pendingPosts.unshift(payload);
            state.activePost = null;
        },
        onAddNewPublishedPost: (state, {payload} ) => {
            state.publishedPosts.unshift(payload);
            state.activePost = null;
        },
        onUpdatePendingPost: (state, {payload} ) => {
            state.pendingPosts = state.pendingPosts.map( post => {

                if(post.id === payload.id){
                    return payload;
                }

                return post;
            });
        },
        onDeletePendingPost: (state) => {
            if (state.activePost){
                state.pendingPosts = state.pendingPosts.filter(post => post.id !== state.activePost.id);
                state.activePost = null;
            }
        },
        onLoadPendingPosts: (state, {payload = []} ) => {
            state.isLoadingPendingPosts = false;
            state.pendingPosts = payload;
            // payload.forEach(post => {
            //     const exists = state.pendingPosts.some(dbPost => dbPost.id === post.id);
            //     if (!exists){
            //         state.pendingPosts.push(post);
            //     }
            // });
            state.activePost = null;
        },
        onLoadPendingPostsCount: (state, {payload = []} ) => {
            state.totalPendingPosts = payload;
        },
        onLoadPublishedPosts: (state, {payload = []} ) => {
            state.isLoadingPublishedPosts = false;
            state.publishedPosts = payload;
            // payload.forEach(post => {
            //     const exists = state.publishedPosts.some(dbPost => dbPost.id === post.id);
            //     if (!exists){
            //         state.publishedPosts.push(post);
            //     }
            // });
            state.activePost = null;
        },
        onLoadPublishedPostsCount: (state, {payload = []} ) => {
            state.totalPublishedPosts = payload;
        },
        onLogoutPosts: (state) => {
            state.isLoadingPendingPosts = true;
            state.isLoadingPublishedPosts = true;
            state.pendingPosts = [];
            state.publishedPosts = [],
            state.activePost = null;
        },
    }
});

export const { onSetActivePost, onAddNewPendingPost, onAddNewPublishedPost, onLoadPendingPosts, onLoadPublishedPosts, onLogoutPosts, onUpdatePendingPost, onDeletePendingPost, onLoadPendingPostsCount, onLoadPublishedPostsCount } = postSlice.actions;