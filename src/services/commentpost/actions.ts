import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { COMMENT_POST } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getCommentPostAction = createAsyncThunk(
    'comment-post/getCommentPostAction',
    async () => {
        const res = await httpClient.get(COMMENT_POST.SELF)
        return res.data
    }
)

export const createCommentPostAction = createAsyncThunk(
    'comment-post/createCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.CREATE, data)
        return res.data
    }
)

export const updateCommentPostAction = createAsyncThunk(
    'comment-post/updateCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.UPDATE, data)
        return res.data
    }
)

export const searchCommentPostAction = createAsyncThunk(
    'comment-post/searchCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.SEARCH, data)
        console.log(data)
        return res.data
    }
)

export const deleteCommentPostAction = createAsyncThunk(
    'comment-post/deleteCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.DELETE, data)
        return res.data
    }
)

export const likeCommentPostAction = createAsyncThunk(
    'comment-post/likeCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.LIKE, data)
        return res.data
    }
)

export const unlikeCommentPostAction = createAsyncThunk(
    'comment-post/unlikeCommentPostAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT_POST.UNLIKE, data)
        return res.data
    }
)
