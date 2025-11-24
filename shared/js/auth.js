import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// REGISTER
export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function logout() {
    return signOut(auth);
}
