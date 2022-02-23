import React, { useEffect } from 'react'
import './Header.css'
import punkLogo from '../assets/header/cryptopunk-logo.png'
import searchIcon from '../assets/header/search.png'
import themeSwitchIcon from '../assets/header/theme-switch.png'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'



const Header = ({ setProfile }) => {

    // get profile from textbox



    // onClick function that retrieves ethereum account
    async function loginButton() {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {accountChangeHandler(result[0])})
    }
    // sets localStorage account variable
    const accountChangeHandler = async (newAccount) => {
        if (newAccount == '') {
            localStorage.setItem('account', 0)  // no accounts
        } else {
            localStorage.setItem('account', newAccount) 
        }
        window.location.reload()
    }

       // checks if user has tangible NFTs
    function isConnected() {
        if (localStorage.getItem('account') == 0) {
            return false;
        } else {
            return true; 
        }
    }
    // updates localStorage account when ethereum account is changed
    window.ethereum.on('accountsChanged', accountChangeHandler)

    let history = useHistory();
    function goHome() {
        history.push("/")
    }

    return (
        <div className='header'>
             <div className='logoContainer'>
                 <img src={punkLogo} className='punkLogo' alt='' onClick={goHome}/>
             </div>

             <div className='searchBar'>
                <div className='searchIconContainer'>
                    <img src={searchIcon} />
                </div>
                <input 
                    className='searchInput' 
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            setProfile(e.target.value)
                            history.push(`/profile/${e.target.value}`)    
                        }
                    }} 
                    placeholder='account or profile ...'
                />
            </div>

            <div className='headerItems'>
				<Link className="profile" to="/profile">Profile</Link>
                <Link className="about" to="/">About</Link>
            </div>
            
            <div  className='headerActions'>
                <div className='themeSwitchContainer' style={{backgroundColor: isConnected() ? '#66feea' : '#a8a8b844'}}>
                    <img src={themeSwitchIcon} />
                </div>
            </div>

            <button className='loginButton' onClick={loginButton}>
                Connect
            </button>

        </div>
        
    )
}

export default Header