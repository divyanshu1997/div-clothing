import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const config = {
    apiKey: "AIzaSyBELQEhYgt8MC2jfiz4xkSUKDSn--as14M",
    authDomain: "div-clothing-db.firebaseapp.com",
    databaseURL: "https://div-clothing-db.firebaseio.com",
    projectId: "div-clothing-db",
    storageBucket: "div-clothing-db.appspot.com",
    messagingSenderId: "637515043184",
    appId: "1:637515043184:web:793c0e027e67d95d6bbfb5",
    measurementId: "G-PP25J7XMBZ"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth ;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef ;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase ;