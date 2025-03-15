import React from 'react'
import AuthScreen from '../components/Auth/AuthScreen'
import { Outlet } from 'react-router'

const Login = () => {
  return (
    <AuthScreen>
      <Outlet />
    </AuthScreen>
  )
}

export default Login
