import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'

class Login extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    isLoggedIn: false,
    isError: false
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

    const { username, password } = this.state
    if (!(username && password)) {
      this.setState({ isError: true })
      return
    }

    bookApi.authenticate(username, password)
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
          isError: false
        })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ isError: true })
      })
  }

  getReferer = () => {
    const locationState = this.props.location.state
    return locationState && locationState.referer ? locationState.referer : '/'
  }

  render() {
    const { isLoggedIn, isError } = this.state
    const referer = this.getReferer()
    if (isLoggedIn) {
      return <Redirect to={referer} />
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
                <Button color='blue' fluid size='large'>Se connecter</Button>
              </Segment>
            </Form>
            <Message>{`Vous n'avez pas de compte ? `}
              <a href='/signup' color='teal' as={NavLink} to="/signup">Cr??er un compte</a>
            </Message>
            {isError && <Message negative>Le pseudo ou mot de passe fourni est incorrect!</Message>}
          </Grid.Column>
        </Grid>
      )
    }
  }
}

export default Login