// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to generate a ridiculously hard CAPTCHA
function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    let num2 = Math.floor(Math.random() * 20) + 1; // 1-20
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
            question = `${num1}^${Math.min(num2, 4)} = ?`; // Power up to 4
            answer = Math.pow(num1, Math.min(num2, 4));
            break;
        case "!":
            question = `${num1 + 3}! = ?`; // Factorial up to 7!
            answer = factorial(num1 + 3);
            break;
        case "%":
            question = `${num1 * 10} % ${num2} = ?`; // Modulo
            answer = (num1 * 10) % num2;
            break;
        case "sqrt":
            let sqrtNum = (num1 + 2) ** 2; // Square of a number (perfect squares)
            question = `√${sqrtNum} = ?`;
            answer = Math.sqrt(sqrtNum);
            break;
        case "log":
            let logNum = Math.pow(10, num1); // Logarithm base 10
            question = `log10(${logNum}) = ?`;
            answer = Math.log10(logNum);
            break;
    }

    document.getElementById("captchaQuestion").textContent = question;
    return answer;
}

let correctCaptchaAnswer = generateCaptcha(); // Generate CAPTCHA on page load

document.getElementById("calculate").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const birthday = document.getElementById("birthday").value;
    const result = document.getElementById("result");
    const insult = document.getElementById("insult");
    const banner = document.getElementById("banner");
    const captchaInput = parseInt(document.getElementById("captchaAnswer").value);

    // CAPTCHA verification
    if (captchaInput !== correctCaptchaAnswer) {
        alert("INCORRECT CAPTCHA! Good luck next time. 😈");
        correctCaptchaAnswer = generateCaptcha(); // Generate a new question
        document.getElementById("captchaAnswer").value = ""; // Clear input
        return;
    }

    if (!birthday) {
        result.textContent = "Please enter your birthday.";
        return;
    }

    // Calculate age
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    result.textContent = name ? `${name}, you are ${age} years old.` : `You are ${age} years old.`;

    if (monthDiff === 0 && dayDiff === 0) {
        banner.textContent = "🎉 Happy Birthday! 🎂";
        banner.style.color = "red";
        banner.style.fontSize = "20px";
        banner.style.fontWeight = "bold";
    } else {
        banner.textContent = "";
    }

    insult.textContent = getDailyInsult(birthDate);
    correctCaptchaAnswer = generateCaptcha(); // Refresh CAPTCHA after successful attempt
});

// Function to generate an insult based on the birthday
function getDailyInsult(date) {
    const insults = [
        "You're so slow, snails send you motivational speeches.",
        "Your jokes are so bad, even crickets refuse to chirp.",
        "You have the charisma of a soggy piece of bread.",
        "You're about as useful as a screen door on a submarine.",
        "You're so awkward, even mannequins feel uncomfortable around you.",
        "If you were any slower, time would go backward just to watch you fail.",
        "Your brain operates on dial-up, and the connection is weak.",
        "Your mother smelled of elderberries and your father was a hamster.",
        "You're so dense, light bends around you.",
        "You're so clumsy, you trip over a wireless connection.",
        "You're so forgetful, you probably forgot to read this insult."

    ];

    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    let dayOfYear = Math.floor(diff / oneDay);

    return insults[dayOfYear % insults.length];
}