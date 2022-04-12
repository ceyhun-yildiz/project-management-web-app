import { useEffect, useState, useRef } from "react"

// firebase imports
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (collectionName, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _q is an array and is "different" on every function call
  const q = useRef(_q).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, collectionName)

    if (q) {
      ref = query(ref, where(...q))
      console.log('where query', ref)
    }
    if (orderBy) {
      ref = query(ref, orderBy(...orderBy))
      console.log('orderBy query', ref)
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collectionName, q, orderBy])

  return { documents, error }
}