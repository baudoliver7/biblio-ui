import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

function BookForm({ bookIsbn, bookTitle, bookCopies, handleInputChange, handleAddBook }) {
  const createBtnDisabled = bookIsbn.trim() === '' || bookTitle.trim() === '' || bookCopies < 0
  return (
    <Form onSubmit={handleAddBook}>
      <Form.Group>
        <Form.Input
          name='bookIsbn'
          placeholder='ISBN *'
          value={bookIsbn}
          onChange={handleInputChange}
        />
        <Form.Input
          name='bookTitle'
          placeholder='Titre *'
          value={bookTitle}
          onChange={handleInputChange}
        />
        <Form.Input
          type="number"
          name='bookCopies'
          placeholder='Number *'
          value={bookCopies}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Créer<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BookForm