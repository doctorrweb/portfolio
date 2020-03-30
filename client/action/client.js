import {
    CREATE_CLIENT,
    READALL_CLEINT,
    UPDATE_CLIENT,
    DELETE_CLIENT
} from './action-type'
import axios from 'axios'
import { parseResponse, parseError } from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createClient(client) {
    return function (dispatch) {

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
                    type: READALL_CLEINT,
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
        axios({
            method: 'delete',
            url: `${BASE_URL}/clients/${clientId}`
        })
            .then((response) => {
                console.log('response.data', response.data)
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

export function updateEntry(id, entry, history) {
    return function (dispatch) {
        axios({
            method: 'put',
            url: `${BASE_URL}/entries/${id}`,
            data: entry,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_ENTRY,
                    payload: id
                })
                dispatch(parseResponse(response.status))
                notification['success']({
                    message: 'Your entry has been updated !',
                    duration: 0,
                })
                //history.push('/dashboard/offers')
            })
            .catch((error) => {
                dispatch(parseError(error.response))
                history.push('/')
            })
    }

}

export function getEntries() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/entries`
        })
            .then((response) => {
                dispatch({
                    type: GET_ALLENTRIES,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
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

export function deleteEntry(entryId) {
    return function (dispatch) {
        axios({
            method: 'delete',
            url: `${BASE_URL}/entries/${entryId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_ENTRY,
                    payload: entryId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
                console.log('deleteOffer error', error)
            })
    }

}
*/

