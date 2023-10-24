import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';


const config = {
apiKey: "AIzaSyCbp9-9-17xu-kMLMSeq9ad2FlhaIUuc3w",
authDomain: "personapal-1d08e.firebaseapp.com",
projectId: "personapal-1d08e",
storageBucket: "personapal-1d08e.appspot.com",
messagingSenderId: "555148953750",
appId: "1:555148953750:web:693a4df40c43fab3b65ab7",
measurementId: "G-34DPXPEYD3"
};

const app = initializeApp(config);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app)

export { app, auth, googleProvider, storage };