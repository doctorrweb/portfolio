import {
    ADD_VIDEO,
    READALL_VIDEO,
    DELETE_VIDEO
} from './action-type'
import axios from 'axios'
import {
    parseResponse,
    parseError,
    parseRequestType,
    resetResponse
} from './index'

const BASE_URL = 'http://localhost:3000/api'


export function addVideo(videos) {

    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('add-video'))

        axios({
            method: 'post',
            url: `${BASE_URL}/videos`,
            data: videos,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: ADD_VIDEO,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readAllVideos() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/videos`
        })
            .then((response) => {
                dispatch({
                    type: READALL_VIDEO,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}


export function deleteVideo(videoId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-video'))
        axios({
            method: 'delete',
            url: `${BASE_URL}/videos/${videoId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_VIDEO,
                    payload: videoId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
