import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext } from 'react';
import { HomePage } from './components/HomePage';



export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {




  return (


    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/addbook" render={() => <h1>Add Book</h1>} />
          <Route exact path="/myprofile" render={() => <h1>My Profile</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route render={() => <h1>404: Page Not Found</h1>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
