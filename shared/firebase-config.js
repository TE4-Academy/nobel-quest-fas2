// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  
  // Din webbapps Firebase-konfiguration
  const firebaseConfig = {
    apiKey: "AIzaSyD_rYe_EMMxlIQ1CLzVly9UtfVROLwawpQ",
    authDomain: "te4-nobelquest.firebaseapp.com",
    projectId: "te4-nobelquest",
    storageBucket: "te4-nobelquest.firebasestorage.app",
    messagingSenderId: "1067428082128",
    appId: "1:1067428082128:web:a53068bd2ae98bb9c489d5",
    measurementId: "G-NMF366H8XL"
  };

  // Initialisera Firebase
  const app = initializeApp(firebaseConfig);
  // Obs: Analytics är valfritt, men behålls här eftersom du hade med det
  const analytics = getAnalytics(app);
  
  // Exportera 'app' för andra Firebase-tjänster (som Auth) att använda
  // Vi exporterar inte 'analytics' då den inte används av auth.js
  export { app };
