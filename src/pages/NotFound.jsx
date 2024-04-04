import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './pages.css';

function NotFound() {
  return (
    <Card className='custom-wrapper'>
        <Card.Header className='text-center text-danger h-50'>This page does not exist!</Card.Header>
        <Card.Body className='text-center text-info'>
            <Button variant='warning' as={Link} to='/'>Back to Home Page</Button>
        </Card.Body>
    </Card>
  )
}

export default NotFound