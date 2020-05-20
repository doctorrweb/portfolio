import {
    CREATE_TUTORIAL, 
    READALL_TUTORIAL,
    READ_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
} from './action-type'
import axios from 'axios'
import {
    parseResponse, 
    parseError,
    parseRequestType,
    resetResponse
} from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createTutorial(tutorial) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-tutorial'))
        axios({
            method: 'post',
            url: `${BASE_URL}/formations`,
            data: tutorial,
        })
            .then(response => {
                dispatch({
                    type: CREATE_TUTORIAL,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readAllTutorials() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/formations`
        })
            .then((response) => {
                dispatch({
                    type: READALL_TUTORIAL,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}


export function readOneTutorial(tutoId) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/formations/${tutoId}`
        })
            .then((response) => {
                dispatch({
                    type: READ_TUTORIAL,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}



export function updateTutorial(tutoId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-tutorial'))
        axios({
            method: 'put',
            url: `${BASE_URL}/formations/${tutoId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_TUTORIAL,
                    payload: tutoId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deleteTutorial(tutoId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-tutorial'))
        axios({
            method: 'delete',
            url: `${BASE_URL}/formations/${tutoId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_TUTORIAL,
                    payload: tutoId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
