import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

import {
  fetchProjectsReducer,
  fetchProjectReducer,
  createProjectReducer,
  updateProjectReducer,
  deleteProjectReducer,
} from "./projects/reducers"

const reducer = combineReducers({
  fetchProjects: fetchProjectsReducer,
  fetchProject: fetchProjectReducer,
  createProject: createProjectReducer,
  deleteProject: deleteProjectReducer,
  updateProject: updateProjectReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
