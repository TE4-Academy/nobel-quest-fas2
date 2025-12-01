import { db, auth } from "../../shared/firebase-config.js";
import { collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Spara poäng till Firebase
export async function saveScoreToFirebase(scoreData) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Ingen användare inloggad");
      return;
    }

    await addDoc(collection(db, "leaderboard-nobel-timeline"), {
      userId: user.uid,
      email: user.email,
      score: scoreData.score,
      correctCount: scoreData.correctCount,
      total: scoreData.total,
      timeLeft: scoreData.timeLeft,
      timestamp: new Date()
    });

    console.log("Poäng sparad till Firebase!");
  } catch (error) {
    console.error("Fel vid sparande till Firebase:", error);
  }
}

// Hämta top 15 från Firebase
export async function getTopScores(topCount = 15) {
  try {
    const q = query(
      collection(db, "leaderboard-nobel-timeline"),
      orderBy("score", "desc")
    );

    const snapshot = await getDocs(q);
    const allScores = [];

    snapshot.forEach((doc) => {
      allScores.push(doc.data());
    });

    // Filtrera så att varje email bara visas med sitt bästa resultat
    const bestScores = {};
    allScores.forEach(score => {
      const email = score.email;
      if (!bestScores[email] || bestScores[email].score < score.score) {
        bestScores[email] = score;
      }
    });

    // Konvertera tillbaka till array och sortera
    const uniqueScores = Object.values(bestScores)
      .sort((a, b) => b.score - a.score)
      .slice(0, topCount);

    return uniqueScores;
  } catch (error) {
    console.error("Fel vid hämtning från Firebase:", error);
    return [];
  }
}