import { useEffect, useState } from "react"

//firebase imports
import { db } from "../firebase/config"
import { doc, onSnapshot } from 'firebase/firestore'

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = doc(db, collectionName, id)

    const unsubscribe = onSnapshot(ref, snapshot => {
      // need to make sure the doc exists & has data
      if(snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collectionName, id])

  return { document, error }
}