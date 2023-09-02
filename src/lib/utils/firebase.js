import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCyp4PIFpKWNokP9NZBSBT-Al4OLpaS3s8',
	authDomain: 'docappoint-5c389.firebaseapp.com',
	projectId: 'docappoint-5c389',
	storageBucket: 'docappoint-5c389.appspot.com',
	messagingSenderId: '354371800417',
	appId: '1:354371800417:web:31201dc6f480248e448920',
	measurementId: 'G-5QB20VQJ1V'
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = firebaseAuth.getAuth(firebaseApp);

export const loginWithEmailAndPassword = async (email, password, succes, failure) => {
  try {
    const userRecord = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    const user = { ...userRecord?.user };
    if(succes) {
      succes(user);
    }
  } catch (error) {
    if(failure) {
      failure(error);
    }
  }
}

export const setSessionPresist = () => {
  return firebaseAuth.setPersistence(auth, firebaseAuth.browserSessionPersistence);
};

export const setlocalPresist = () => {
  return firebaseAuth.setPersistence(auth, firebaseAuth.browserLocalPersistence);
};

export const logout = () => {
  window.localStorage.setItem('authToken', null);
  return firebaseAuth.signOut(auth);
}
