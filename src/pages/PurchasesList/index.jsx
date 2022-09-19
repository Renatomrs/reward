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
import Purchase from '../../components/Purchase'

import './styles.css'

const PurchasesList = () => {
  const navigate = useNavigate()

  const { 
    purchases,
    setPurchases,
  } = UserAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (userId) => {
      const uid = userId?.uid;
      
      if (userId) {
        const purchasesRef = collection(db, 'purchases')

        const purchaseId = query(purchasesRef, where('customerId', '==', uid))
       
        onSnapshot(purchaseId, (snapshot) => {
          setPurchases(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })        
      }
    });
  }, [])
    
  return (
    <div>
      <Header>
        <button 
          className="button-menu"
          onClick={() => navigate("/user")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z"/>
          </svg>
        </button>
      </Header>
  
      <div className="page">
        {
          purchases[purchases.length - 1] ?
          (
            <div className='last-purchases'>
              <div className='title-h2'>
                <h2>Purchases</h2>
              </div>
        
              <section className='purchasesContainer'>
                {purchases.map((item) => {
                  return (
                    <Purchase
                      item={item} 
                      key={item.id}
                    />
                  )
                })}
              </section>
            </div>
          )
          :
          (
            <div className='center'>
              <h2>No purchase yet!</h2>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PurchasesList
