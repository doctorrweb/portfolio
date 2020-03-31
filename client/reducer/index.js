import { combineReducers } from 'redux'
//import { reducer as form } from 'redux-form'
//import { routerReducer } from 'react-router-redux'
import AuthenticationReducer from './authentication'
import LocaleReducer from './locale'
import ShowModalLoginReducer from './modalLogin'
import ShowMainMenuReducer from './mainMenu'
import ToggleBtnReducer from './menuBtn'
import ResponseReducer from './response'
import ErrorReducer from './error'
import { SetCurrentUserReducer, UserReducer } from './user'
import PostReducer from './post'
import ProjectReducer from './project'
import ClientReducer from './client'
import TutorialReducer from './tutorial'
import ImageReducer from './image'
import VideoReducer from './video'

const rootReducer = combineReducers({
    authentication: AuthenticationReducer,
    currentUser: SetCurrentUserReducer,
    locale: LocaleReducer,
    //router: routerReducer,
    modalLogin: ShowModalLoginReducer,
    mainMenu: ShowMainMenuReducer,
    response: ResponseReducer,
    error: ErrorReducer,
    toggleBtn: ToggleBtnReducer,
    users: UserReducer,
    posts: PostReducer,
    projects: ProjectReducer,
    clients: ClientReducer,
    tutorials: TutorialReducer,
    images: ImageReducer,
    videos: VideoReducer
    //form
})

export default rootReducer
