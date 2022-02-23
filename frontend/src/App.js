import './App.css';
import {BrowserRouter  as Router, Route, Switch, useParams} from 'react-router-dom'
import{useState, useEffect} from 'react'; 
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';


function App() {

  const [profile, setProfile] = useState('NULL');


  console.log("Searched Profile: ", profile)
  console.log("Connected Account: ", localStorage.getItem('account'))

  return (
    <Router>
      <div className="App">
        <Header setProfile={setProfile}/>
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile/:account">
              <Profile account={profile} isUser={false} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
