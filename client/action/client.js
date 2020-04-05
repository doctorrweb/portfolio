import {
    CREATE_CLIENT,
    READALL_CLIENT,
    UPDATE_CLIENT,
    DELETE_CLIENT
} from './action-type'
import axios from 'axios'
import {
    parseResponse, 
    parseError,
    parseRequestType,
    resetResponse
} from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createClient(client) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-client'))
        axios({
            method: 'post',
            url: `${BASE_URL}/clients`,
            data: client,
            //config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: CREATE_CLIENT,
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

export function readAllClients() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/clients`
        })
            .then((response) => {
                //console.log(response.data)
                dispatch({
                    type: READALL_CLIENT,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function updateClient(clientId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-client'))
        axios({
            method: 'put',
            url: `${BASE_URL}/clients/${clientId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_CLIENT,
                    payload: clientId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deleteClient(clientId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-client'))
        axios({
            method: 'delete',
            url: `${BASE_URL}/clients/${clientId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_CLIENT,
                    payload: clientId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
