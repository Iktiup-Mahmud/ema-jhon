import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css'


const SignUp = () => {
    const { createUser } = useContext(AuthContext)

    const [error, setError] = useState('');

    const handelSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password, confirm)

        if (password.length < 6) {
            setError('Your password should be 6 character long.')

        }

        if (password !== confirm) {
            setError('Your password did not match!!')
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset();
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>SignUp</h1>
            <form onSubmit={handelSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Your Email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='Confirm Password' required />
                </div>
                <button className='btn-submit' type="submit">SignUp</button>
            </form>
            <p>Already have an Account? <Link to='/login'>Log In</Link></p>
            <p className='error-text'>{error}</p>
        </div>
    );
};

export default SignUp;