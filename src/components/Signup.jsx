import React from 'react'

const Signup = () => {
    return (
        <div>
            <h1>Create an Account</h1>
            <div>
                <input type="username" />
                <label htmlFor="">Username</label>
            </div>
            <div>
                <input type="firstname" />
                <label htmlFor="">First Name</label>
            </div>
            <div>
                <input type="lastname" />
                <label htmlFor="">Last Name</label>
            </div>
            <div>
                <input type="middlename" />
                <label htmlFor="">Middle Name</label>
            </div>
            <div>
                <input type="Password" />
                <label htmlFor="">Password</label>
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor="">User Type</label>
            </div>

        </div>
    )
}

export default Signup