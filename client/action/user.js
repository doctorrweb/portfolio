import {
    READALL_USER,
    UPDATE_USER,
    DELETE_USER,
} from './action-type'
import axios from 'axios'
import {
    parseResponse,
    parseError,
    parseRequestType,
    resetResponse,
} from './index'

const BASE_URL = 'http://localhost:3000/api'


// use the logonUser function to create a new user

export function readAllUsers() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/users`
        })
            .then((response) => {
                dispatch({
                    type: READALL_USER,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function updateUser(userId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-user'))
        axios({
            method: 'put',
            url: `${BASE_URL}/users/${userId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_USER,
                    payload: userId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function deleteUser(userId) {
    return function (dispatch) {
        axios({
            method: 'delete',
            url: `${BASE_URL}/users/${userId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_USER,
                    payload: userId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}
