import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { POST } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getPostAction = createAsyncThunk(
    'post/getPostAction',
    async () => {
        const res = await httpClient.get(POST.SELF)
        return res.data
    }
)

export const createPostAction = createAsyncThunk(
    'post/createPostAction',
    async (data: {}) => {
        const res = await formdata.put(POST.CREATE, data)
        return res.data
    }
)

export const updatePostAction = createAsyncThunk(
    'post/updatePostAction',
    async (data: {}) => {
        const res = await formdata.put(POST.UPDATE, data)
        return res.data
    }
)

export const searchPostAction = createAsyncThunk(
    'post/searchPostAction',
    async (data: {}) => {
        const res = await httpClient.get(POST.SEARCH, data)
        return res.data
    }
)

export const deletePostAction = createAsyncThunk(
    'post/deletePostAction',
    async (data: {}) => {
        const res = await httpClient.post(POST.DELETE, data)
        return res.data
    }
)

export const likePostAction = createAsyncThunk(
    'post/likePostAction',
    async (data: {}) => {
        const res = await formdata.post(POST.LIKE, data)
        return res.data
    }
)

export const unlikePostAction = createAsyncThunk(
    'post/unlikePostAction',
    async (data: {}) => {
        const res = await formdata.post(POST.UNLIKE, data)
        return res.data
    }
)

export const savePostAction = createAsyncThunk(
    'post/savePostAction',
    async (data: {}) => {
        const res = await formdata.post(POST.SAVE, data)
        return res.data
    }
)

export const unsavePostAction = createAsyncThunk(
    'post/unsavePostAction',
    async (data: {}) => {
        const res = await formdata.post(POST.UNSAVE, data)
        return res.data
    }
)

export const getAllSaveAction = createAsyncThunk(
    'post/unsavePostAction',
    async () => {
        const res = await httpClient.get(POST.GETALLSAVE)
        return res.data
    }
)
