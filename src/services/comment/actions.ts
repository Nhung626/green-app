import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { COMMENT } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getCommentAction = createAsyncThunk(
    'comment/getCommentAction',
    async () => {
        const res = await httpClient.get(COMMENT.SELF)
        return res.data
    }
)

export const createCommentAction = createAsyncThunk(
    'comment/createCommentAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT.CREATE, data)
        return res.data
    }
)

export const updateCommentAction = createAsyncThunk(
    'comment/updateCommentAction',
    async (data: {}) => {
        const res = await formdata.put(COMMENT.UPDATE, data)
        return res.data
    }
)

export const searchCommentAction = createAsyncThunk(
    'comment/searchCommentAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT.SEARCH, data)
        return res.data
    }
)

export const deleteCommentAction = createAsyncThunk(
    'comment/deleteCommentAction',
    async (data: {}) => {
        const res = await httpClient.post(COMMENT.DELETE, data)
        return res.data
    }
)

export const likeCommentAction = createAsyncThunk(
    'comment/likeCommentAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT.LIKE, data)
        return res.data
    }
)

export const unlikeCommentAction = createAsyncThunk(
    'comment/unlikeCommentAction',
    async (data: {}) => {
        const res = await formdata.post(COMMENT.UNLIKE, data)
        return res.data
    }
)
