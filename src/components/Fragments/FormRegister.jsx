import React, { useEffect, useRef } from 'react'
import InputForm from '../Elements/Input'
import Button from '../Elements/Buttons'

const FormRegister = () => {
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
    }, [])
    return (
        <form action="">
            <InputForm label="Fullname" type="text" placeholder="Insert yout name here" name="fullname" ref={nameRef} />
            <InputForm label="Email" type="email" placeholder="example@mail.com" name="email" />
            <InputForm label="Password" type="password" placeholder="******" name="password" />
            <InputForm label="Confirm Password" type="password" placeholder="******" name="confirmPassword" />

            <Button classname="bg-blue-600 w-full">Register</Button>
        </form>
    )
}

export default FormRegister
