import firebase,{ initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config=
    {
        apiKey: "AIzaSyDLsDp5drwIEtQlJ79B2lsicyufC4GGyPY",
        authDomain: "crwn-db-3fa5c.firebaseapp.com",
        databaseURL: "https://crwn-db-3fa5c.firebaseio.com",
        projectId: "crwn-db-3fa5c",
        storageBucket: "crwn-db-3fa5c.appspot.com",
        messagingSenderId: "26392169230",
        appId: "1:26392169230:web:91d0c0cd308d0c42f8255f",
        measurementId: "G-L5M6YHNT1X"
      };

      export const createUserProfileDocument=async (userAuth, additionalData)=>{
        if(!userAuth) return;

        const userRef=firestore.doc(`users/${userAuth.uid}`);

        const snapShot=await userRef.get();

        if(!snapShot.exists){
          const {displayName,email}=userAuth;
          const createdAt=new Date();
          try{
           await userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalData
           })
          }
          catch(error){
            console.log('error creating user',error.message);
          }
        }
        return userRef;
      }

      firebase.initializeApp(config);
      
      export const auth=firebase.auth();
      export const firestore=firebase.firestore();

      const provider=new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});
      export const signInWithGoogle=()=>auth.signInWithPopup(provider);

      export default firebase;