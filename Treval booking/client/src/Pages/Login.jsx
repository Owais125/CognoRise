// import React, { useState, useContext } from 'react'
// import '../styles/login.css'
// import { Link ,useNavigate } from 'react-router-dom'
// import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap'
// import loginImg from '../assets/images/login.png'
// import userIcon from '../assets/images/user.png'
// import { AuthContext } from '../context/AuthContext'
// import {BASE_URL} from '../utilts/config.js'



// const Login = () => {
//   const navigate  = useNavigate()
//   const {dispatch} = useContext(AuthContext)
//   const [credentials, setCredentials] = useState({
//    email:undefined,
//    password:undefined
// })
//   const handleChange =(e)=>{
//     setCredentials(pre=>({...pre,[e.target.id]:e.target.value}))
// }
// const handleClick = async(e)=>{
//   e.preventDefault()
//   dispatch({type:'LOGIN_START'})
//   try {
//     const res = await fetch(`${BASE_URL}/auth/login`,{
//       method:'post',
//       headers:{
//         'content-type':'application/json'
//       },
//       credentials:'include',
//       body:JSON.stringify(credentials)
//     })
//     const result = await res.json()
//     if (!res.ok) alert(res.message)
//       dispatch({type:'LOGIN_SUCCESS',paylod:result.data.username})
//     navigate('/')
//     console.log(result.data)
//   } catch (error) {
//     dispatch({type:'LOGIN_FAILURE',paylod:error.data})
    
//   }
// }
//   return (
//    <section>
//     <Container>
//       <Row>
//         <Col lg='8' className='m-auto'>
//         <div className="login__container d-flex justify-content-between">
//           <div className="login__img">
//             <img src={loginImg} alt="" />
//           </div>
//           <div className="login__form">
//             <div className="user">
//               <img src={userIcon} alt="" />
//             </div>
//             <h2>Login</h2>
//             <Form onSubmit={handleClick}>
//               <FormGroup>
//                 <input type="email" placeholder='Email' required id='email' onChange={handleChange}/>
//               </FormGroup>
//               <FormGroup>
//                 <input type="password" placeholder='Password' required id='password' onChange={handleChange}/>
//               </FormGroup>
//               <Button className='btn btn-warning auth__btn'>Login</Button>
//             </Form>
//             <p>Don't have an account <Link to='/register'>Create</Link></p>
//           </div>

//         </div>
//         </Col>
//       </Row>
//     </Container>
//    </section>
//   )
// }

// export default Login
import React, { useState, useContext } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utilts/config.js';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const result = await res.json();

      if (res.ok) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data }); // Update with actual user data
        navigate('/');
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        alert(result.message); // Show error message from response
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      alert(error.message); // Show error message
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder='Email'
                      required
                      id='email'
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder='Password'
                      required
                      id='password'
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className='btn btn-warning auth__btn'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
