import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'ticketapp-fiuba.firebaseapp.com',
  projectId: 'ticketapp-fiuba',
  storageBucket: 'ticketapp-fiuba.appspot.com',
  messagingSenderId: '239998931541',
  appId: '1:239998931541:web:65e72991c86c004c85badc',
  measurementId: 'G-CSK47J9MKW',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
export const auth = getAuth(app)
