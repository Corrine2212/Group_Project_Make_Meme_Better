import React, { useState } from "react"
import ForgotPassword from "./ForgotPassword"
import { loginUser } from "../../services/UserServices"
import { postNewUser } from "../../services/UserServices"

const Login = ({onSubmitLogin, addUser}) => {

    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        post: []
    })

    const handleCreate = () => {
      setButtonClicked(!buttonClicked)
    }
    
    const onChange = (e) => {
        const newFormData = Object.assign({}, formData);
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postNewUser(formData).then((data) => {
            addUser(data);
        })
        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }

    const handleUsernameOrEmailChange = (event) => {
        setUsernameOrEmail(event.target.value)
    }

    const handleUsernameChange = (event) => {
      setUsername(event.target.value)
  }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        const user = {
          username: username,
          email: email,
          password: password
        };

        // loginUser(user) // loginUser is a function that takes in a user object and returns a promise
        //   .then((data) => { // data is the user that is logged in
        //     console.log("db response", data);
            if (
              user && // if data exists
              user.email === email && // if the email matches
              user.password === password // if the password matches
            ) {
              console.log('User Logged In', user);
              onSubmitLogin(user);
            } else {
              console.log('Authentication failed');
            }
          }
          // .catch((error) => {
          //   console.error('Error occurred:', error);
          // });
        
        // setUsername('');
        // setPassword('');
      



    return (
        <div>
            <h2>Sign in </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" id="user" placeholder="  USERNAME OR EMAIL  " value={username} onChange={handleUsernameChange} required />
                <input text="password" id="password" placeholder="  PASSWORD  " value={password} onChange={handlePasswordChange} required />
                <input type="submit" value="Log in" />
            </form>
            <div>
                <button onClick={() => setShow(true)}>Forget Password?</button>
                <ForgotPassword onClose={() => setShow(false)} show={show} />
            </div>
            <div>
                <button onClick={handleCreate}>create an account?</button>
                {buttonClicked ? <div>
                <h1>Create Form</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" id="user" name='username' placeholder="  USERNAME  " value={formData.username} onChange={onChange} required />
                    <input type="text" id="email" name='email' placeholder="  EMAIL  " value={formData.email} onChange={onChange} required />
                    <input type="password" id="password" name='password' placeholder="  PASSWORD  " value={formData.password} onChange={onChange} required />
                    <input type="submit" value="Create Account" />
                </form>
                <button onClick={handleCreate}>Cancel</button>
                </div> : null}
            </div>
        </div>
    )
}
export default Login;