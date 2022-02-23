import React from 'react'

const Profile = ({ account, isUser}) => {

    return (
        <div className='profilePage'>
            <p>{account}</p>
        </div>
    )
}

export default Profile