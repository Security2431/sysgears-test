import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

const Navigation = () => (
  <Navbar bg="dark" variant="dark" style={{ marginBottom: '30px' }}>
    <Container>
      <Navbar.Brand href="/">SysGears</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/task1">Task 1</Nav.Link>
        <Nav.Link href="/task2">Task 2</Nav.Link>
        <Nav.Link href="/task3">Task 3</Nav.Link>
        <Nav.Link href="/task4">Task 4</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
)

export default Navigation
