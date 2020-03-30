import {
    CREATE_POST,
    READALL_POST,
    UPDATE_POST,
    DELETE_POST
} from './action-type'
import axios from 'axios'
import { parseResponse, parseError } from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createPost(post) {
    return function (dispatch) {
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
                console.log(error)
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
                //console.log(response.data)
                dispatch({
                    type: READALL_POST,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function updatePost(postId, updatedContent) {
    return function (dispatch) {
        axios({
            method: 'put',
            url: `${BASE_URL}/entries/${postId}`,
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
        axios({
            method: 'delete',
            url: `${BASE_URL}/posts/${postId}`
        })
            .then((response) => {
                console.log('response.data', response.data)
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
/*
export function creatEntryFormOffer(entry, history) {
    return function (dispatch) {
        console.log('entry', entry)
        axios.all([
            axios.post(`${BASE_URL}/newEntry`, entry),
            axios.put(`${BASE_URL}/workflows/${entry.workflow}`, { status: 'hrAdministration' })
        ])
            .then(axios.spread((entryResponse, workflowResponse) => {
                console.log('workflowResponse', workflowResponse)
                console.log('entreyResponse', entryResponse)
                dispatch({
                    type: CREATE_ENTRY,
                    payload: entryResponse.data
                })
                dispatch({
                    type: UPDATE_WORKFLOW,
                    payload: entry.workflow
                })
                dispatch(parseResponse(entryResponse.status))
                history.push('/dashboard/offers')
            }))
            .catch((error) => {
                console.log(error)
                dispatch(parseError(error.response))
                history.push('/')
            })
    }

}





export function getEntry(id) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/entries/${id}`
        })
            .then((response) => {
                dispatch({
                    type: GET_ENTRY,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}


*/

