
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import{getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCkYGu07p5opMPA2f3HHWIYuosbh056g64",
    authDomain: "inn-app-cee5a.firebaseapp.com",
    databaseURL: "https://inn-app-cee5a-default-rtdb.firebaseio.com",
    projectId: "inn-app-cee5a",
    storageBucket: "inn-app-cee5a.appspot.com",
    messagingSenderId: "727017456023",
    appId: "1:727017456023:web:a3cb497e56ca4d5b1b04d2",
    measurementId: "G-1HLC10FTXP"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(fireDb);
export const database = getDatabase(fireDb);
export default fireDb.database().ref();

