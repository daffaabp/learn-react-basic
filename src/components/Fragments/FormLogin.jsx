import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../Elements/Input'
import Button from '../Elements/Buttons'
import { login } from '../../../services/auth.services'

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  // Handle Klik untuk Login
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  return (
    <form onSubmit={handleLogin}>

      <InputForm label="Username" type="text" placeholder="john doe" name="username" ref={usernameRef} />
      <InputForm label="Password" type="password" placeholder="******" name="password" />

      <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
      {loginFailed && <p className='text-red-500 text-center mt-5'>{loginFailed}</p>}
    </form>

  )
}

export default FormLogin
