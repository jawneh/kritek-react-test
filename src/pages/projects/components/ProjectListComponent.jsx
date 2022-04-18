import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Container, Button } from "react-bootstrap"

import LoaderComponent from "../../../components/LoaderComponent"
import AlertComponent from "../../../components/AlertComponent"
import ProjectEditComponent from "./ProjectEditComponent"
import { fetchProjectsAction, deleteProjectAction } from "../../../services/projects/actions"

const ProjectListComponent = () => {
  const dispatch = useDispatch()
  const [target_element, setTargetElement] = useState(null)

  const { loading, error, projects } = useSelector(state => state.fetchProjects)
  const {
    loading: delete_loading,
    error: delete_error,
    project: deleted_project,
  } = useSelector(state => state.deleteProject)

  useEffect(() => {
    dispatch(fetchProjectsAction())
  }, [])

  const editProject = id => {
    setTargetElement(id)
  }
  const deleteProject = id => {
    setTargetElement(id)
    dispatch(deleteProjectAction(id))
  }

  return (
    <Container style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <h1> Projects listing</h1>
      <hr />
      {loading && <LoaderComponent />}
      {error && (
        <AlertComponent variant="danger" show_prop={true}>
          {error}
        </AlertComponent>
      )}
      <Row>
        {projects.map(project => (
          <Col key={project.id} sm="12" md="4">
            {target_element === project.id ? (
              <ProjectEditComponent project_id={project.id} resetTargetElement={setTargetElement} />
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{project.owner}</Card.Subtitle>
                  <Card.Text>{project.description}</Card.Text>
                  <Button variant="outline-primary" onClick={e => editProject(project.id)}>
                    edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="outline-danger"
                    onClick={e => deleteProject(project.id)}
                    disabled={target_element === project.id && delete_loading}
                  >
                    delete
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProjectListComponent
