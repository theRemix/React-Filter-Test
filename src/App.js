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
    users : [],
    companyFilter : '',
    searchFilter : '',
  }

  componentDidMount() {

    const users = generateUsers(this.props.numUsers);
    this.setState({ users });

  }

  applyFilters = user => {
    let matched = true;
    if( this.state.companyFilter !== '' ){
      matched = matched && user.company === this.state.companyFilter;
    }
    if( this.state.searchFilter !== '' ){
      matched = matched && 
        (
          user.firstName.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) >= 0 ||
          user.lastName.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) >= 0 ||
          user.company.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) >= 0
        );
    }

    return matched;
  }

  applyLimit = (_, i) => {
    return this.props.limit && i < this.props.limit;
  }

  companySelected = e => {
    this.setState({
      companyFilter : e.currentTarget.value
    })
  }

  searchFilter = e => {
    this.setState({
      searchFilter : e.currentTarget.value
    })
  }

  render() {
    const filteredUsers = this.state.users.filter(this.applyFilters);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <select onChange={this.companySelected}>
            <option value=''>Select Company</option>
            { companies.map((c, i) => <option key={i} value={c}>{c}</option> ) }
          </select>

          <input type="text" placeholder="Search" onChange={this.searchFilter} />
        </div>
        <div className="table-container">
          <p>{ filteredUsers.length } results found</p>
          <table>
            <tbody>

              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Company</th>
              </tr>

              { filteredUsers
                  .filter(this.applyLimit)
                  .map(( user, i ) => <Row key={i} {...user} /> ) }

            </tbody>
          </table>
          {
            this.props.limit && filteredUsers.length > this.props.limit ? <p>{ filteredUsers.length - this.props.limit } more results...</p> : ''
          }
        </div>
      </div>
    );
  }
}

export default App;
