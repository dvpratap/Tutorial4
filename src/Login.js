import './App.css';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  var flag = true;
  const inputEmail = (e) =>{
    setEmail(e.target.value);
  }
  const inputPassword = (e) => {
    setPassword(e.target.value);
  }
  const validation = () => {
    let errors = {}
    if(email===""){
        errors.email = "Email is required!!"
        flag = false
    }else if(!/\S+@\S+\.\S+/.test(email)){
        errors.email="Invalid Email !!";
        flag = false
    }    
    if(password===""){
        errors.password="Password is required !";
        flag = false
        }else if(!/^[ A-Za-z0-9_@./#&+-]{8,}$/i.test(password)){
        errors.password="Password must be >= 8 characters..";
        flag = false
        }
        return errors
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    setErrors(validation(email,password));
    if(Object.keys(errors).length === 0 && flag){
    axios.post('https://express-t4.onrender.com/api/login',{
      username : email,
      password : password
    }).then(result=>{
        console.log(result.data.message)
      if(result.data.message.includes('success')){
        window.alert("Login Success !!");
        navigate('/searchPage');
      }
    })
    .catch(error=>{
      console.log(error)
    })
}
  }
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card sx={{height: '420px'}}>
        <form>
        <Typography variant="h4" gutterBottom sx={{marginTop:'30px'}}>
        Login
      </Typography>
        <div className='margin-top'>
        <TextField
          id="email"
          label="Email"
          defaultValue=""
          value={email}
          onChange={inputEmail}
        />
        {errors.email && <p className='error'>{errors.email}</p>}
        </div>
        <div className='margin-top'>
        <TextField
          id="password"
          type='password'
          label="Password"
          value={password}
          onChange={inputPassword}
          defaultValue=""
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        </div>
        <div className='margin-top'>
        <Button variant="contained" onClick={handleSubmit} type='submit'>Submit</Button>
        </div>
        </form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
