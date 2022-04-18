import React, { useState } from "react"
import { Alert } from "react-bootstrap"
const AlertComponent = ({ variant, children }) => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {children}
      </Alert>
    )
  }
}

export default AlertComponent
