import React from "react"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import User from './pages/User'
import PurchaseForm from './pages/PurchaseForm'
import PurchasesList from './pages/PurchasesList'

import Protected from './components/Protected'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<Protected><User /></Protected>} />
        <Route path="/purchase" element={<Protected><PurchaseForm /></Protected>} />
        <Route path="/purchases" element={<Protected><PurchasesList /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
