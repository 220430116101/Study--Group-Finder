document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Email Validation (simple regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Password Validation (minimum 6 characters)
    if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store auth token
            localStorage.setItem("authToken", data.authToken);

            localStorage.setItem("isLoggedIn", "true"); // Store login status in localStorage

            // Show success alert first
            // alert("Login successful!");

            // Start confetti animation after alert is closed
            triggerConfetti();

            // Redirect to dashboard after confetti effect
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2500); // Wait 2 seconds before redirecting
        } else {
            // Improved error messages
            alert(data.error || "Invalid email or password. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
});

// Function to trigger confetti effect
function triggerConfetti() {
    const duration = 1500;
    const end = Date.now() + duration;

    const confettiInterval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(confettiInterval); // Stop confetti effect after 1.5 seconds
        }
        confetti({
            particleCount: 200,
            spread: 130,
            startVelocity: 80,
            ticks: 300,
            origin: { x: Math.random(), y: 0 },
            gravity: 3.0
        });
    }, 50);
}
