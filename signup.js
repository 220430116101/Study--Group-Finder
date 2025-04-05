document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get input values
    const fullName = document.getElementById("fullName").value.trim();
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
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: fullName, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful!");

            // 🎉 Trigger confetti effect AFTER alert is closed
            setTimeout(() => {
                const duration = 1500;
                const end = Date.now() + duration;

                const confettiInterval = setInterval(function() {
                    if (Date.now() > end) {
                        clearInterval(confettiInterval);
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
            }, 500); // Small delay to trigger after alert closes

            // Store login status in localStorage
    localStorage.setItem("isLoggedIn", "true");

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2500);
        } else {
            alert(data.error || "Signup failed! Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
});
