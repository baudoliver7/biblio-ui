import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    groups: []
  };

  async componentDidMount() {
    const response = await fetch('/Livres');
    const body = await response.json();
    this.setState({ livres: body, isLoading: false });
  }

  render() {
    const {livres, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Liste de livres</h2>
            {livres.map(livre =>
              <div key={livre.id}>
                {livre.intitule}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
