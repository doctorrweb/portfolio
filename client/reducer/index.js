import { combineReducers } from 'redux'
//import { reducer as form } from 'redux-form'
//import { routerReducer } from 'react-router-redux'
import AuthenticationReducer from './authentication'
import LocaleReducer from './locale'
import ShowModalLoginReducer from './modalLogin'
//import ShowSidebarReducer from './showsidebar'
import ResponseReducer from './response'
import ErrorReducer from './error'
import SetCurrentUserReducer from './user'

const rootReducer = combineReducers({
    authentication: AuthenticationReducer,
    currentUser: SetCurrentUserReducer,
    locale: LocaleReducer,
    //router: routerReducer,
    modalLogin: ShowModalLoginReducer,
    //sidebar: ShowSidebarReducer,
    response: ResponseReducer,
    error: ErrorReducer,
    //form
})

export default rootReducer
