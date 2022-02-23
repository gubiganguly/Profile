import React from 'react'
import './Profile.css'
import{useState, useEffect} from 'react'; 
import axios from 'axios';

const Profile = ({ isUser }) => {

    // get profile info from database
    const account = localStorage.getItem('profile')
    const [profile, setProfile] = useState([])

    // api call to backend
    useEffect(async () => {
        try {
            let profileData = await axios.get(`http://localhost:5000/profile/${account}`)
            setProfile(profileData.data)
        } catch (err) {
            console.log("account not found!")
        }
    }, [account])


    return (
        <div className='profilePage'>
            <div className='profileHeader'>
                <div className='imageContainer'>
                    <img className='profileImage' src={profile.profileImage} alt='' />
                </div>
                <div className='profileName'>
                    <h1>{profile.name}</h1>
                </div>
                <div className='profileDescription'>
                    <p>{profile.profileDescript}</p>
                </div>
            </div>

            <div className='postsOrProducts'>
                Posts or Products
            </div>
        </div>
    )
}

export default Profile