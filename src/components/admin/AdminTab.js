import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import BookTable from './BookTable'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isBooksLoading, books, bookIsbn, bookTitle, bookCopies, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Utilisateurs' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'books', icon: 'book', content: 'Livres' },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
          <BookTable
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookCopies={bookCopies}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab