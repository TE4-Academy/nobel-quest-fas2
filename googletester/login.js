// login.js

import { login } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const messageElement = document.getElementById("auth-message");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Antag att du har inputfält med id="email" och id="password"
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            
            messageElement.textContent = "Loggar in...";
            messageElement.style.color = "blue";

            try {
                const userCredential = await login(email, password);
                console.log("Inloggning lyckades:", userCredential.user);
                
                messageElement.textContent = "Inloggning lyckades! Omdirigerar...";
                messageElement.style.color = "green";
                
                // Omdirigera till startsidan eller en skyddad sida efter inloggning
                window.location.href = "/"; 

            } catch (error) {
                console.error("Inloggningsfel:", error.message);
                
                // Visa ett mer användarvänligt felmeddelande
                let errorMessage = "Inloggning misslyckades.";
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Ogiltig e-postadress.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Användarkontot har inaktiverats.';
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage = 'Felaktig e-post eller lösenord.'; // Generiskt meddelande för säkerhet
                        break;
                    default:
                        errorMessage = `Fel: ${error.message}`;
                        break;
                }
                
                messageElement.textContent = errorMessage;
                messageElement.style.color = "red";
            }
        });
    }
});