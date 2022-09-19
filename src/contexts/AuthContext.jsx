import { useContext, createContext } from "react"

import { useState, useEffect } from "react"

import { auth, db } from "../services/firebase"

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import { 
  doc, 
  addDoc, 
  setDoc, 
  collection,
} from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const [name, setName] = useState("")
  const [documentId, setDocumentId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [number, setNumber] = useState("")
  const [value, setValue] = useState("")

  const [customers, setCustomers] = useState([])
  const [purchases, setPurchases] = useState([])

  const [userScore, setUserScore] = useState([])

  let totalScore = 0

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password,
      )

      await setDoc(doc(db, "customers", res.user.uid), {
        id: res.user.uid,
        name,
        email,
        documentId,
      })
    } catch (error) {
      alert(error)
    }

    setName("")
    setDocumentId("")
    setEmail("")
    setPassword("")
  }
  
  const enterAccount = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() =>  {
    })
    .catch((error) => console.log(error.message));

    setEmail("")
    setPassword("")
  }
  
  const logOut = async () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      alert(error)
    });
  }

  const sendPurchase = async () => {
    try {
      const docRef = await addDoc(collection(db, "purchases"), {
        customerId: user.uid,
        number,
        value,
        score: value * 8 / 100
      })

      console.log("Document written with ID: ", docRef.id);

    } catch (error) {
      alert(error)
    }

    setNumber("")
    setValue("")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      register,
      enterAccount, 
      logOut,
      sendPurchase,
      number,
      setNumber,
      totalScore,
      value,
      setValue,
      user,
      name,
      setName,
      documentId,
      setDocumentId,
      email,
      setEmail,
      password,
      setPassword,
      customers,
      setCustomers,
      purchases,
      setPurchases,
      userScore,
      setUserScore
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
