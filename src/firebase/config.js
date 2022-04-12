import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // Your config object from firebase v9
}

// init firebase
const firebaseApp = initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage(firebaseApp)

export { db, auth, storage }