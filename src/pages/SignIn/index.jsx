import { useEffect } from 'react'

import { UserAuth } from '../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import Header from '../../components/Header'
import Form from '../../components/Form'

import './styles.css'

const SignIn = () => {
  const navigate = useNavigate()
  
  const {
    user,
    enterAccount,
    email,
    setEmail,
    password,
    setPassword
  } = UserAuth()

  const handleSignIn = async () => {
    try {
      await enterAccount()
      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    if(user) {
      navigate("/user")
    } 
  }, [user])

  return (
    <div>
      <Header>
        <Link to="/">
          <button className="button-menu">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512">
              {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z"
              />
            </svg>
          </button>
        </Link>
      </Header>

      <div className="page">
        <Form title="Sign In">
          <div className='inputSignIn'>
            <div className='inputIcon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
            </div>

            <input 
              type="email" 
              placeholder='Email' 
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </div>

          <div className='inputSignIn'>
            <div className='inputIcon x'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
              </svg>
            </div>

            <input 
              type="password" 
              placeholder='Password' 
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </div>
         
          <button 
            type='button'
            onClick={handleSignIn}
          >
            Enter
          </button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn