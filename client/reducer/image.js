import {
    ADD_IMAGE
} from '../action/action-type'

const initialState = {
    images: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_IMAGE:
        return {
            images: [...state.images, ...action.payload]
        }
    default:
        return state
    }
}