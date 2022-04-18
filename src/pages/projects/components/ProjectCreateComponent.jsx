import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap"

import AlertComponent from "../../../components/AlertComponent"
import { createProjectAction } from "../../../services/projects/actions"
import { CREATE_PROJECT_FAILURE } from "../../../services/projects/constants"

const ProjectCreateComponent = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [owner, setOwner] = useState("")
  const [description, setDescription] = useState("")

  const { loading, project, error, success } = useSelector(state => state.createProject)

  useEffect(() => {
    if (success) {
      setTitle("")
      setOwner("")
      setDescription("")
    }
  }, [success])

  const submitForm = e => {
    e.preventDefault()
    if (title && owner && description) {
      dispatch(createProjectAction({ title, owner, description }))
    } else {
      dispatch({ type: CREATE_PROJECT_FAILURE, payload: "All fields are required" })
    }
  }

  return (
    <Container style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Card style={{ padding: "1rem" }}>
        <h4>Add new project form</h4>
        <hr />
        {error && <AlertComponent variant="danger">{error}</AlertComponent>}
        {success && <AlertComponent variant="success">{project.title} added</AlertComponent>}
        <Form onSubmit={submitForm}>
          <Row>
            <Col sm="6" md="6" lg="6">
              <Form.Label>Project title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Col>
            <Col sm="6" md="6" lg="6">
              <Form.Label>Owner</Form.Label>
              <Form.Control type="text" value={owner} onChange={e => setOwner(e.target.value)} />
            </Col>
            <Col sm="6" md="6" lg="6">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </Col>
          </Row>
          <Button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default ProjectCreateComponent
