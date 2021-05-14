import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import BookForm from './BookForm'

function BookTable({ books, bookIsbn, bookTitle, bookCopies, bookTextSearch, handleInputChange, handleAddBook, handleDeleteBook, handleSearchBook }) {
  let bookList
  if (books.length === 0) {
    bookList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>Aucun livre</Table.Cell>
      </Table.Row>
    )
  } else {
    bookList = books.map(book => {
      return (
        <Table.Row key={book.isbn}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteBook(book.isbn)}
            />
          </Table.Cell>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{book.isbn}</Table.Cell>
          <Table.Cell>{book.title}</Table.Cell>
          <Table.Cell>{book.copies}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: 'search' }}
                name='bookTextSearch'
                placeholder='Rechercher par ISBN ou par titre'
                value={bookTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <BookForm
              bookIsbn={bookIsbn}
              bookTitle={bookTitle}
              bookCopies={bookCopies}
              handleInputChange={handleInputChange}
              handleAddBook={handleAddBook}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={3}>Couverture</Table.HeaderCell>
            <Table.HeaderCell width={4}>ISBN</Table.HeaderCell>
            <Table.HeaderCell width={8}>Titre</Table.HeaderCell>
            <Table.HeaderCell width={2}>Exemplaires</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </>
  )
}

export default BookTable