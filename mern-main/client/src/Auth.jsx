import * as React from 'react';
import {useState} from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button } from 'react-bootstrap'
import {useCookies,setCookies} from 'react-cookie'
import Axios from 'axios'

const Auth = () => {
  const [cookies, setCookies] = useCookies("access token")
  
  const removeCookies = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("admin")
    window.location.reload(false)
 }

 return (
    <>

     

      {
         cookies.access_token
         ? <Button variant= "danger" onClick={removeCookies}>Logout</Button>
         : (
          <>
            <Register />
            <Login />


          </>

          

           
         )

         
        
 
      }
    
    
    </>
  
   
  );
 };

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault();

    await Axios.post ("http://localhost:8000/register", {username,password})

    alert("admin created");
    
  

  }
  return(
    <AuthForm
      label="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />

     
  )

};
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const[_, setCookies] = useCookies(["access_token"])

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await Axios.post ("http://localhost:8000/login", {username,password})
    setCookies("access_token", response.data.token)
    window.localStorage.setItem("userID", response.data.adminID)
    window.location.reload(false)
    
  }

  return(
     <AuthForm
      label="Login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit = {onSubmit}
     />

     
  )




};
const AuthForm = ({label,username,setUsername,password,setPassword} ) => {
  return(
    <Container>
      
      <Form className='form'>
       <h2 className= "text-white">{label}</h2>
       <Form.Control type="text" placeholder='Name'
                    id="username" value={username}
                    onChange={e => setUsername(e.target.value)}
        />

        <Form.Control type="text" placeholder='Password'
                    id="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
        <Button variant="success" type="submit" >{label}</Button>
      </Form>
    </Container>
  )

}
  

export default Auth
