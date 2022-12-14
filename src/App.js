import React, { createContext } from 'react'
import styles from './App.module.css'
import NavBar from './components/NavBar'
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm'
import { HomePage } from './components/HomePage'
import NewProject from './project/NewProject'
import SingleProject from './project/SingleProject'
import SinglePage from './project/SinglePage'
import ProfilePage from './pages/auth/Profile'
import EditProject from './project/EditProject'

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App () {
  return (

    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/addbook" render={() => <NewProject />} />
          <Route exact path="/book/:id" render={() => <SingleProject />} />
          <Route exact path="/editbook/:id" render={() => <EditProject />} />
          <Route exact path="/page/:id" render={() => <SinglePage />} />
          <Route exact path="/myprofile" render={() => <ProfilePage />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route render={() => <h1>404: Page Not Found</h1>} />
        </Switch>
      </div>
    </div>

  )
}

export default App
