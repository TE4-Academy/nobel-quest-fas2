// register.js

import { register } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration-form");
    const messageElement = document.getElementById("auth-message");

    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Hämta värden från formulärets inputfält
            const email = registrationForm.email.value;
            const password = registrationForm.password.value;
            
            messageElement.textContent = "Registrerar...";
            messageElement.style.color = "blue";

            try {
                const userCredential = await register(email, password);
                console.log("Registrering lyckades:", userCredential.user);
                
                messageElement.textContent = "Registrering lyckades! Omdirigerar...";
                messageElement.style.color = "green";
                
                // Omdirigera till startsidan efter lyckad registrering/inloggning
                window.location.href = "/"; 

            } catch (error) {
                console.error("Registreringsfel:", error.code, error.message);
                
                let errorMessage = "Registrering misslyckades. Vänligen kontrollera dina uppgifter.";
                
                // Felkoder från Firebase
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'E-postadressen används redan.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Ogiltig e-postadress.';
                        break;
                    case 'auth/weak-password':
                        // Visar ett generellt felmeddelande utan att avslöja detaljer
                        errorMessage = 'Registrering misslyckades. Vänligen välj ett annat lösenord.';
                        break;
                    default:
                        // Alla andra fel
                        errorMessage = `Ett okänt fel uppstod: ${error.message}`;
                        break;
                }
                
                messageElement.textContent = errorMessage;
                messageElement.style.color = "red";
            }
        });
    }
});