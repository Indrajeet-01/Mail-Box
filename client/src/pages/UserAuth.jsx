
import React, { useState } from 'react';
import { Form, Button,Container  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {  useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import './userAuth.css'
import { useAuth } from '../context/auth.js';

import { auth } from '../firebase.js';

const UserAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const { dispatch } = useAuth();

  const navigate = useNavigate()

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        
        const user = userCredential.user;
        try {
          const token = await user.getIdToken(); 
          dispatch({ type: 'SIGN_IN', user, token });
          alert('login successful')
          navigate('/create-mail');
        } catch (error) {
          console.error(error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleSignUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          
          const user = userCredential.user;
          try {
            const token = await user.getIdToken(); 
            
            dispatch({ type: 'SIGN_IN', user, token });
            alert('user registered successfully')
            navigate('/create-mail');
          } catch (error) {
            console.error(error);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error("Password and Confirm Password do not match.");
    }
  }

  return (
    <Container fluid className="container-wrapper d-flex align-items-center justify-content-center" style={{ height: '100vh',width: '30%' }}>
      <div className=" bg-white rounded shadow p-3 text-center">
        <h1 className={`text-center text-${isSignUp ? 'success' : 'primary'}`}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </h1>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          {isSignUp && (
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}

          {isSignUp ? (
            <Button variant="success" onClick={handleSignUp} className="mt-3">
              Sign Up
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSignIn} className="mt-3">
              Log In
            </Button>
          )}

          <p className={`mt-3 text-${isSignUp ? 'primary' : 'success'}`}>
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
            <span className={`toggle-link ml-2 text-${isSignUp ? 'success' : 'primary'}`} onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer' }}>
              {isSignUp ? 'Log In' : 'Create Account'}
            </span>
          </p>
        </Form>
      </div>
    </Container>
  );
}

export default UserAuth;
