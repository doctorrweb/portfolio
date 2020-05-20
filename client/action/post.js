import {
    CREATE_POST,
    READALL_POST,
    READTRANSLATED_POSTS,
    READ_POST,
    UPDATE_POST,
    DELETE_POST
} from './action-type'
import axios from 'axios'
import {
    parseResponse, 
    parseError, 
    parseRequestType,
    resetResponse
} from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createPost(post) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-post'))
        axios({
            method: 'post',
            url: `${BASE_URL}/posts`,
            data: post,
        })
            .then(response => {

                dispatch({
                    type: CREATE_POST,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readAllPosts() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/posts`
        })
            .then((response) => {
                dispatch({
                    type: READALL_POST,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readTranslatedPosts(lang) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/posts`,
            data: lang
        })
            .then((response) => {
                dispatch({
                    type: READTRANSLATED_POSTS,
                    payload: response.data.filter((post) => post.lang === lang)
                })
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readPost(postId) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/posts/${postId}`
        })
            .then((response) => {
                dispatch({
                    type: READ_POST,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function updatePost(postId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-post'))
        axios({
            method: 'put',
            url: `${BASE_URL}/posts/${postId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_POST,
                    payload: postId
                })
                
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deletePost(postId) {
    
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-post'))
        axios({
            method: 'delete',
            url: `${BASE_URL}/posts/${postId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}