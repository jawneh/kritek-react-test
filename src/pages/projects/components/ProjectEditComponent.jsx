import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Form, Row, Col, Button, Card } from "react-bootstrap"
import AlertComponent from "../../../components/AlertComponent"
import LoaderComponent from "../../../components/LoaderComponent"
import { updateProjectAction, fetchProjectAction } from "../../../services/projects/actions"
import { UPDATE_PROJECT_FAILURE, FETCH_PROJECT_RESET, UPDATE_PROJECT_RESET } from "../../../services/projects/constants"

const ProjectEditComponent = ({ project_id, resetTargetElement }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [owner, setOwner] = useState("")
  const [description, setDescription] = useState("")

  const { loading, error, project } = useSelector(state => state.fetchProject)
  const {
    loading: loading_update,
    error: error_update,
    project: project_update,
    success,
  } = useSelector(state => state.updateProject)

  useEffect(() => {
    dispatch({ type: UPDATE_PROJECT_RESET })
    dispatch(fetchProjectAction(project_id))
  }, [])

  useEffect(() => {
    if (project.id) {
      setTitle(project.title)
      setOwner(project.owner)
      setDescription(project.description)
    }
  }, [project.id, project.title, project.owner, project.description])

  const submitForm = e => {
    e.preventDefault()
    if (title && owner && description) {
      dispatch(updateProjectAction(project_id, { title, owner, description }))
    } else {
      dispatch({ type: UPDATE_PROJECT_FAILURE, payload: "All fields are required" })
    }
  }

  const handleCancelUpdate = e => {
    e.preventDefault()
    dispatch({ type: FETCH_PROJECT_RESET })

    resetTargetElement(null)
  }
  return (
    <>
      {error && <AlertComponent variant="danger">{error}</AlertComponent>}
      {error_update && <AlertComponent variant="danger">{error_update}</AlertComponent>}
      {success && <AlertComponent variant="success">{project_update.title} added</AlertComponent>}
      {loading_update && <LoaderComponent />}
      {loading ? (
        <LoaderComponent />
      ) : (
        <Card style={{ padding: "1rem", border: "1px solid green" }}>
          <Form onSubmit={submitForm}>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Form.Label>Project title</Form.Label>
                <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </Col>
              <Col sm="12" md="12" lg="12">
                <Form.Label>Owner</Form.Label>
                <Form.Control type="text" value={owner} onChange={e => setOwner(e.target.value)} />
              </Col>
              <Col sm="12" md="12" lg="12">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
              </Col>
            </Row>
            <Button type="submit" disabled={loading_update} style={{ marginTop: "1rem" }}>
              update
            </Button>
            <Button
              type="button"
              style={{ marginTop: "1rem" }}
              className="btn-light"
              onClick={e => handleCancelUpdate(e)}
            >
              cancel
            </Button>
          </Form>
        </Card>
      )}
    </>
  )
}

export default ProjectEditComponent
