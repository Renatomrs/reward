import { UserAuth } from '../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import Header from '../../components/Header'
import Form from '../../components/Form'
import Input from '../../components/Input'

const SignUp = () => {
  const navigate = useNavigate()

  const { 
    register,
    name,
    setName,
    documentId,
    setDocumentId,
    email,
    setEmail,
    password,
    setPassword
  } = UserAuth()

  const handleSignUp = async () => {
    try {
      await register()
      navigate("/user")
    } catch (error) {
      console.log(error)
    }
  }
  
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
        <Form title="Sign Up">
          <Input 
            type="text" 
            textLabel="Name" 
            placeholder="Name*"
            onChange={event => setName(event.target.value)}
            value={name}
          />

          <Input 
            type="tel" 
            textLabel="Document ID" 
            placeholder="Document ID*"
            onChange={event => setDocumentId(event.target.value)}
            value={documentId}
          />

          <Input 
            type="email" 
            textLabel="Email" 
            placeholder="Email*"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />

          <Input 
            type="password" 
            textLabel="Password" 
            placeholder="Password*"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />

          <button 
            type='button'
            onClick={handleSignUp}
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
