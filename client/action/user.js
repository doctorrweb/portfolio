import {
    CREATE_USER,
    READALL_USER,
    UPDATE_USER,
    DELETE_USER
} from './action-type'
import axios from 'axios'
import { parseResponse, parseError } from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createUser(user) {
    return function (dispatch) {

        axios({
            method: 'post',
            url: `${BASE_URL}/users`,
            data: user,
            //config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: CREATE_USER,
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

export function readAllUsers() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/users`
        })
            .then((response) => {
                //console.log(response.data)
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
