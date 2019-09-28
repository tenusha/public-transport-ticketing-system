import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, Suspense } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AccountSettings from './components/AccountSettings'
import NavBar from './components/commons/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'


class App extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      showLogin: false,
      showRegister: false
    }

    this.config = {
      selected: 'home'
    }

    this.baseState = this.state
  }

  handleChange = obj => {
    if (obj instanceof Object) {
      this.setState({ ...obj })
    }
  }

  handleLogout = () => {
    this.setState(this.baseState)
    localStorage.clear()
  }

  handleLoginShow = () => {
    this.setState({ showLogin: true })
  }

  handleLoginClose = () => {
    this.setState({ showLogin: false })
  }

  handleRegisterShow = () => {
    this.setState({ showRegister: true })
  }

  handleRegisterClose = () => {
    this.setState({ showRegister: false })
  }

  render() {

    return (
      <>
        <div className="main-container">
          <NavBar
            handleLoginShow={this.handleLoginShow}
            handleRegisterShow={this.handleRegisterShow}
            logout={this.handleLogout}
            {...this.state}
          />

          <Login
            showLogin={this.state.showLogin}
            handleShow={this.handleLoginShow}
            handleClose={this.handleLoginClose}
            handleRegisterShow={this.handleRegisterShow}
          />

          <Register
            showRegister={this.state.showRegister}
            handleShow={this.handleRegisterShow}
            handleClose={this.handleRegisterClose}
            handleLoginShow={this.handleLoginShow}
          />

          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admins" component={Home} />
                <Route exact path="/routs" component={Home} />
                <Route exact path="/users" component={Home} />
                <Route path="/account" component={AccountSettings} />
              </Switch>
            </Suspense>
          </Router>
        </div>

        <Footer />

        <ToastContainer
          autoClose={3000}
          position="bottom-right"
        />
      </>
    );
  }
}

export default App;
