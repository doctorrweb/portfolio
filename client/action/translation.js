import {
    CREATE_TRANSLATION,
    READALL_TRANSLATION,
    READ_TRANSLATION,
    UPDATE_TRANSLATION,
    DELETE_TRANSLATION
} from './action-type'
import axios from 'axios'
import {
    parseResponse,
    parseError,
    parseRequestType,
    resetResponse,
} from './index'

const BASE_URL = 'http://localhost:3000/api'

export function createTranslation(trans) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-translation'))

        axios({
            method: 'post',
            url: `${BASE_URL}/translations`,
            data: trans,
        })
            .then((response) => {
                dispatch({
                    type: CREATE_TRANSLATION,
                    payload: response.data,
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readAllTranslations() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/translations`,
        })
            .then((response) => {
                dispatch({
                    type: READALL_TRANSLATION,
                    payload: response.data,
                })
                // dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readTranslation(transId) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/translations/${transId}`,
        })
            .then((response) => {
                dispatch({
                    type: READ_TRANSLATION,
                    payload: response.data,
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function updateTranslation(transId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-translation'))
        axios({
            method: 'put',
            url: `${BASE_URL}/translations/${transId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_TRANSLATION,
                    payload: transId,
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function deleteTranslation(transId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-translation'))
        axios({
            method: 'delete',
            url: `${BASE_URL}/translations/${transId}`,
        })
            .then((response) => {
                dispatch({
                    type: DELETE_TRANSLATION,
                    payload: transId,
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}
