import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LogginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password: '',
    photo:''
  })
  initializeLoginFramework();
  const [LoggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=>{
      handleGoogleSignIn()
      .then(res=>{
        handleResponse(res,true);
      })
  }

  const signOut = ()=>{
      handleSignOut()
      .then(res=>{
        handleResponse(res,false);
      })
  }

  const fbSignIn = ()=>{
      handleFbSignIn()
      .then(res=>{
        handleResponse(res,true);
      })
  }
  

  

  

  

  const handleSubmit = (e)=>{
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        handleResponse(res,true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        handleResponse(res,true);
      })
    }

    e.preventDefault();
  }

  const handleChange = (e)=>{
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name ==='password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid =isPasswordValid && passwordHasNumber;
    }

    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleResponse = (res, redirect)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
    
  }

  

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
        }
        <br/>
        {
          <button onClick= {fbSignIn}>Facebook Sign In</button>
        }
      {
        user.isSignedIn && <div>
          <p>Welcome,{user.name}</p>
          <p>Email:{user.email}</p>
          <img src={user.photo} alt="" ></img>
          </div>
      }

      <h1>Our own Authentication</h1>
      <form  onSubmit={handleSubmit}>

       <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id=""/>
       <label htmlFor="newUser">New User Registration</label>
        <br/>
        {newUser && <input name="name" type="text" onBlur={handleChange} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleChange} placeholder="Your mail address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleChange} placeholder="Your password" required/>
        <br/>
        <input type="Submit" value={newUser ? 'Sign Up' : 'Sign In'}></input>
      </form>

      <p style={{color:'red'}}>{user.error}</p>

      {
        user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
