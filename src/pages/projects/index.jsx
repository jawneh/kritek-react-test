import React from "react"
import ProjectListComponent from "./components/ProjectListComponent"
import ProjectCreateComponent from "./components/ProjectCreateComponent"

const ProjectsIndexComponent = () => {
  return (
    <>
      <ProjectCreateComponent />
      <ProjectListComponent />
    </>
  )
}

export default ProjectsIndexComponent
