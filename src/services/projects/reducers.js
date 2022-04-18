import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_RESET,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  UPDATE_PROJECT_RESET,
} from "./constants.js"

export const fetchProjectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.payload }
    case FETCH_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchProjectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return { ...state, loading: true }
    case FETCH_PROJECT_SUCCESS:
      return { ...state, loading: false, project: action.payload }
    case FETCH_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_PROJECT_RESET:
      return { project: {} }
    default:
      return state
  }
}

export const createProjectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return { ...state, loading: true }
    case CREATE_PROJECT_SUCCESS:
      return { ...state, loading: false, project: action.payload, success: true }
    case CREATE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateProjectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return { ...state, loading: true }
    case UPDATE_PROJECT_SUCCESS:
      return { ...state, loading: false, project: action.payload, success: true }
    case UPDATE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_PROJECT_RESET:
      return { project: {} }
    default:
      return state
  }
}

export const deleteProjectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return { ...state, loading: true }
    case DELETE_PROJECT_SUCCESS:
      return { ...state, loading: false, project: action.payload, success: true }
    case DELETE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
