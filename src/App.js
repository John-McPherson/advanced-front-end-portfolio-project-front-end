import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext } from 'react';
import { HomePage } from './components/HomePage';
import NewProject from './project/NewProject';
import SingleProject from './project/singleProject';



export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {




  return (


    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/addbook" render={() => <NewProject />} />
          <Route exact path="/book/:id" render={() => <SingleProject />} />
          <Route exact path="/editbook/:id" render={() => <SingleProject />} />
          <Route exact path="/page/:id" render={() => <h1>Page placeholder</h1>} />
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
