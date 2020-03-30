import {
    ADD_VIDEO
} from '../action/action-type'

const initialState = {
    videos: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_VIDEO:
        return {
            videos: [...state.videos, ...action.payload]
        }
    default:
        return state
    }
}