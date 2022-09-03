import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/addbook" render={() => <h1>Add book</h1>} />
          <Route exact path="/myprofile" render={() => <h1>Add book</h1>} />
          <Route exact path="/logout" render={() => <h1>Add book</h1>} />
        </Switch>
        {/* <h1>add books</h1>
        <h1>ny profile</h1>
        <h1>add logout</h1> */}
      </Container>


    </div>
  );
}

export default App;
