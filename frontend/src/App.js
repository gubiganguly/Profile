import './App.css';
import {BrowserRouter  as Router, Route, Switch, useParams} from 'react-router-dom'
import{useState, useEffect} from 'react'; 
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';


function App() {

  console.log("Searched Profile: ", localStorage.getItem('profile'))
  console.log("Connected Account: ", localStorage.getItem('account'))

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile/:account">
              <Profile isUser={false} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
