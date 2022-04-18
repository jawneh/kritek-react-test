import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from "./constants.js"
const { REACT_APP_DATABASE_URI } = process.env

export const fetchProjectsAction = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROJECTS_REQUEST })
    const response = await fetch(`${REACT_APP_DATABASE_URI}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    const projects = await response.json()
    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: projects })
  } catch (err) {
    dispatch({ type: FETCH_PROJECTS_FAILURE, payload: err.response.data || "uncaught error" })
  }
}

export const fetchProjectAction = id => async dispatch => {
  try {
    dispatch({ type: FETCH_PROJECT_REQUEST })
    const response = await fetch(`${REACT_APP_DATABASE_URI}/projects/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    const project = await response.json()
    dispatch({ type: FETCH_PROJECT_SUCCESS, payload: project })
  } catch (err) {
    dispatch({ type: FETCH_PROJECT_FAILURE, payload: err.response.data || "uncaught error" })
  }
}

export const createProjectAction =
  (data = {}) =>
  async dispatch => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST })
      const response = await fetch(`${REACT_APP_DATABASE_URI}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      const project = await response.json()
      dispatch({ type: CREATE_PROJECT_SUCCESS, payload: project })
      dispatch(fetchProjectsAction())
    } catch (err) {
      dispatch({ type: CREATE_PROJECT_FAILURE, payload: err.response.data || "uncaught error" })
    }
  }
export const updateProjectAction =
  (id, data = {}) =>
  async dispatch => {
    try {
      dispatch({ type: UPDATE_PROJECT_REQUEST })
      const response = await fetch(`${REACT_APP_DATABASE_URI}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      const project = await response.json()
      dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: project })
      dispatch(fetchProjectsAction())
    } catch (err) {
      dispatch({ type: UPDATE_PROJECT_FAILURE, payload: err.response.data || "uncaught error" })
    }
  }

export const deleteProjectAction = id => async dispatch => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST })
    const response = await fetch(`${REACT_APP_DATABASE_URI}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    const project = await response.json()
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: project })
    dispatch(fetchProjectsAction())
  } catch (err) {
    dispatch({ type: DELETE_PROJECT_FAILURE, payload: err.response.data || "uncaught error" })
  }
}
