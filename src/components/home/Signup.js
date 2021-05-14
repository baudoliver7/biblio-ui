import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'

class Signup extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    isLoggedIn: false,
    isError: false,
    errorMessage: ''
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, name, email } = this.state
    if (!(username && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: 'SVP, renseigner tous les champs!'
      })
      return
    }

    const user = { username, password, name, email }
    bookApi.signup(user)
      .then(response => {
        const { id, name, role } = response.data
        const authdata = window.btoa(username + ':' + password)
        const user = { id, name, role, authdata }

        const Auth = this.context
        Auth.userLogin(user)

        this.setState({
          username: '',
          password: '',
          isLoggedIn: true,
          isError: false,
          errorMessage: ''
        })
      })
      .catch(error => {
        handleLogError(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Champs invalides'
          if (errorData.status === 409) {
            errorMessage = errorData.message
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage
          }
          this.setState({
            isError: true,
            errorMessage
          })
        }
      })
  }

  render() {
    const { isLoggedIn, isError, errorMessage } = this.state
    if (isLoggedIn) {
      return <Redirect to='/' />
    } else {
      return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  autoFocus
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder='Pseudo'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Mot de passe'
                  type='password'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='name'
                  icon='address card'
                  iconPosition='left'
                  placeholder='Nom complet'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='email'
                  icon='at'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleInputChange}
                />
                <Button color='blue' fluid size='large'>Créer votre compte</Button>
              </Segment>
            </Form>
            <Message>{`Avez-vous déjà un compte? `}
              <a href='/login' color='teal' as={NavLink} to="/login">Se connecter</a>
            </Message>
            {isError && <Message negative>{errorMessage}</Message>}
          </Grid.Column>
        </Grid>
      )
    }
  }
}

export default Signup