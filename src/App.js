import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import Books from './components/Books';
import Book from './components/Book';
import { UserProvider } from './contexts/userContext';

class App extends Component {
  setToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }

  // Method to check if a token exists in the session storage
  getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken != null
  }

  // Method to remove the token from the session storage
  removeToken = () => {
    sessionStorage.removeItem('token');
  }
  render() {
    return (
      <div className="App">
        <UserProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login setToken={this.setToken} removeToken={this.removeToken} getToken={this.getToken} />} />
              <Route exact path="/user" element={<User getToken={this.getToken} />} />
              <Route exact path="/books" element={<Books getToken={this.getToken} />} />
              <Route exact path="/book" element={<Book getToken={this.getToken} />} />
              <Route exact path="/users" element={<Users getToken={this.getToken} />} />
            </Routes>
          </Router>
        </UserProvider>
      </div>
    );
  }
}

export default App;
