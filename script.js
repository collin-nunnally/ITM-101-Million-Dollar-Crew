import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

<<<<<<< HEAD
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9txyqjOcBIVkodnF_lKVYigtXXwGgvmk",
    authDomain: "million-dollar-crew.firebaseapp.com",
    projectId: "million-dollar-crew",
    storageBucket: "million-dollar-crew.firebasestorage.app",
    messagingSenderId: "719263246304",
    appId: "1:719263246304:web:e2bf79dc335b9295c4ad85",
    measurementId: "G-D7CB8TZ9C9"
};

=======
>>>>>>> origin/Nunn-dog's-Product_Manager
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to generate a CAPTCHA
function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let operations = ["+", "-", "*", "**", "!", "%", "sqrt", "log"];
    let operation = operations[Math.floor(Math.random() * operations.length)];

    let question, answer;
    switch (operation) {
        case "+":
            question = `${num1 * 10} + ${num2 * 5} = ?`;
            answer = (num1 * 10) + (num2 * 5);
            break;
        case "-":
            question = `${num1 * 10} - ${num2 * 5} = ?`;
            answer = (num1 * 10) - (num2 * 5);
            break;
        case "*":
            question = `${num1} * ${num2} = ?`;
            answer = num1 * num2;
            break;
        case "**":
            question = `${num1}^${Math.min(num2, 4)} = ?`;
            answer = Math.pow(num1, Math.min(num2, 4));
            break;
        case "!":
            question = `${num1 + 3}! = ?`;
            answer = factorial(num1 + 3);
            break;
        case "%":
            question = `${num1 * 10} % ${num2} = ?`;
            answer = (num1 * 10) % num2;
            break;
        case "sqrt":
            let sqrtNum = (num1 + 2) ** 2;
            question = `√${sqrtNum} = ?`;
            answer = Math.sqrt(sqrtNum);
            break;
        case "log":
            let logNum = Math.pow(10, num1);
            question = `log10(${logNum}) = ?`;
            answer = Math.log10(logNum);
            break;
    }

    document.getElementById("captchaQuestion").textContent = question;
    return answer;
}

let correctCaptchaAnswer = generateCaptcha();

// Calculate Age
document.getElementById("calculate").addEventListener("click", function() {
    const name = document.getElementById("name").value.trim();
    const birthday = document.getElementById("birthday").value;
    const result = document.getElementById("result");
    const insult = document.getElementById("insult");
    const banner = document.getElementById("banner");
    const captchaInput = parseInt(document.getElementById("captchaAnswer").value);

    if (captchaInput !== correctCaptchaAnswer) {
        alert("INCORRECT CAPTCHA!");
        correctCaptchaAnswer = generateCaptcha();
        document.getElementById("captchaAnswer").value = "";
        return;
    }

    if (!birthday) {
        result.textContent = "Please enter your birthday.";
        return;
    }

    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }

    result.textContent = name ? `${name}, you are ${age} years old.` : `You are ${age} years old.`;
    insult.textContent = insultsList.length ? insultsList[Math.floor(Math.random() * insultsList.length)] : "No insults available.";

    correctCaptchaAnswer = generateCaptcha();
});

// Submit Insult
document.getElementById("submitInsult").addEventListener("click", async function() {
    const newInsult = document.getElementById("newInsult").value.trim();
    const message = document.getElementById("submissionMessage");

    if (!newInsult) {
        message.textContent = "Please enter an insult before submitting.";
        message.style.color = "red";
        return;
    }

    try {
        await addDoc(collection(db, "insults"), { text: newInsult, timestamp: new Date() });
        message.textContent = "Insult submitted successfully!";
        message.style.color = "green";
        document.getElementById("newInsult").value = "";
        loadInsults();
    } catch (error) {
        message.textContent = "Error submitting insult." + error;
        message.style.color = "red";
        console.error("Error adding document: ", error);
    }
});

// Load insults from Firestore
async function loadInsults() {
    const querySnapshot = await getDocs(collection(db, "insults"));
    insultsList.length = 0;
    const insultListElement = document.getElementById("insultsList");
    insultListElement.innerHTML = "";

    querySnapshot.forEach(doc => {
        const insultText = doc.data().text;
        insultsList.push(insultText);
        const li = document.createElement("li");
        li.textContent = insultText;
        insultListElement.appendChild(li);
    });
}

const insultsList = [];
loadInsults();