import { useEffect } from 'react'

import { auth, db } from '../../services/firebase'

import { onAuthStateChanged } from 'firebase/auth'

import { 
  collection, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore'

import { UserAuth } from '../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import Customer from '../../components/Customer'

import './styles.css'

const User = () => {
  const navigate = useNavigate()
  
  const { 
    logOut,
    customers,
    setCustomers,
    purchases,
    setPurchases,
    userScore,
    setUserScore
  } = UserAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (userId) => {
      const uid = userId?.uid;
      
      if (userId) {
        const customersRef = collection(db, 'customers')
        const purchasesRef = collection(db, 'purchases')

        const customerId = query(customersRef, where('id', '==', uid))
        const purchaseId = query(purchasesRef, where('customerId', '==', uid))
       
        onSnapshot(customerId, (snapshot) => {
          setCustomers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        onSnapshot(purchaseId, (snapshot) => {
          setPurchases(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })        
      }
    });
  }, [])
  
  useEffect(() => {
    if (purchases.length > 0) {
      const totalScore = purchases.reduce((accumulator, {score}) => accumulator + score, 0)
      setUserScore(totalScore)
    }
  }, [purchases])
  
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <Header>
        <button 
          type='button'
          className="button-menu"
          onClick={handleSignOut}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"/>
          </svg>
        </button>

        <button 
          className="button-menu"
          onClick={() => navigate('/')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512">
            {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z"
            />
          </svg>
        </button>
      </Header>

      <div className="page">
        {
          customers[customers.length - 1] ?
          (
            <>
              <div className='user-status'>
                <span>Hello, {customers.map((item) => { return item.name })}!</span>
              </div>
              
              <section className='usersContainer'>
                {customers.map((item) => {
                  return (
                    <Customer 
                      item={item} 
                      key={item.id} 
                      totalScore={userScore}>

                      <button 
                        type='button'
                        className='button-purchase'
                        onClick={() => navigate("/purchase")}
                      >
                        Register Purchase
                      </button>
                    </Customer>
                  )
                })}
              </section>

              <button 
                type='button'
                className='button-view-purchase'
                onClick={() => navigate("/purchases")}
              >
                Last Purchases
              </button>
            </>
          )
          :
          (
            <div className='center'>
              <h2>Loading...</h2>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default User
