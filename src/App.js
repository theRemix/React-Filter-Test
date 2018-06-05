import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { companies, firstNames, lastNames } from './data';

const generateUsers = num => Array(num).fill(null).map((_, i) => ({
  firstName : firstNames[Math.floor(Math.random() * firstNames.length)],
  lastName : lastNames[Math.floor(Math.random() * lastNames.length)],
  company : companies[Math.floor(Math.random() * companies.length)],
}))

const Row = ({ firstName, lastName, company }) => 
  <tr>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{company}</td>
  </tr>;

class App extends Component {
  state = {
    users : []
  }

  componentDidMount() {

    const users = generateUsers(this.props.numUsers);
    this.setState({ users });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <select>
            <option>Select Company</option>
            { companies.map(c => <option value={c}>{c}</option> ) }
          </select>

          <input type="text" placeholder="Search" />
        </div>
        <div className="table-container">
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company</th>
            </tr>

            { this.state.users.map(user => <Row {...user} /> ) }

          </table>
        </div>
      </div>
    );
  }
}

export default App;
