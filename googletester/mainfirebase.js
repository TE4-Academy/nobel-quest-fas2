
//import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
//import { 
//  getAuth, 
 // GoogleAuthProvider, 
 // signInWithPopup, 
 // onAuthStateChanged,
//  signInWithEmailAndPassword,
//  createUserWithEmailAndPassword
//} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// --- Firebase Config ---
//const firebaseConfig = {
  //apiKey: "AIzaSyB8c8TZsDsgZaQx3t4DWm8x3e0QZHVbj0A",
  //authDomain: "te4-nobel-quests.firebaseapp.com",
 // projectId: "te4-nobel-quests",
 // storageBucket: "te4-nobel-quests.firebasestorage.app",
 // messagingSenderId: "1098687895626",
 // appId: "1:1098687895626:web:bb4459a0ac7890792c6eb3",
 // measurementId: "G-XPPM9PF0TW"
//};

// --- Initialize ---
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);
//auth.languageCode = 'en';

// --- Google Login ---
//const provider = new GoogleAuthProvider();
//const googleLogin = document.getElementById('google-login-btn');

//googleLogin.addEventListener('click', () => {
//  alert('Logging in with Google account');

 //signInWithPopup(auth, provider)
  //  .then((result) => {
  //    console.log('User signed in (Google): ', result.user);
  //    window.location.href = "logged.html";
  //  })
   // .catch((error) => {
   //   console.error("Google login error:", error.message);
      alert("Error: " + error.message);
    //});
//});

// --- Email + Password Login ---
//const emailInput = document.getElementById("email-input");
//const passwordInput = document.getElementById("password-input");
//const emailLoginBtn = document.getElementById("email-login-btn");

//emailLoginBtn.addEventListener("click", () => {
//  const email = emailInput.value;
//  const password = passwordInput.value;
  //if (!email || !password) {
   // alert("Please enter both email and password.");
   // return;
 // }

  //signInWithEmailAndPassword(auth, email, password)
   // .then((result) => {
    //  console.log("User signed in (email): ", result.user);
    //  window.location.href = "logged.html";
    //})
    //.catch((error) => {
    //  console.error("Email login error:", error.message);
//
     // if (error.code === "auth/user-not-found") {
        //alert("User not found. Want to create an account?");
      //} else if (error.code === "auth/wrong-password") {
       // alert("Incorrect password.");
      //} else {
       // alert("Error: " + error.message);
      //}
    //});
//});

// --- OPTIONAL: Auto redirect if already logged in ---
//onAuthStateChanged(auth, (user) => {
  //if (user) {
  //  console.log("User already logged in:", user.email);
    // window.location.href = "logged.html"; // aktivera om du vill auto-redirecta
 // }
//});
