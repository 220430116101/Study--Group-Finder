
// Optional dynamic features
document.querySelector('.search-btn').addEventListener('click', () => {
    const query = document.querySelector('.search-input').value;
    alert(`Searching for: ${query}`);
});

document.addEventListener("DOMContentLoaded", () => {
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        // Create the Logout button
        const logoutBtn = document.createElement("a");
        logoutBtn.textContent = "Logout";
        logoutBtn.href = "#";
        logoutBtn.style.textDecoration = "none"; 
        logoutBtn.style.backgroundColor = "#ff4d4d"; 
        logoutBtn.style.color = "white"; 
        logoutBtn.style.padding = "10px 20px"; 
        logoutBtn.style.borderRadius = "5px"; 
        logoutBtn.style.marginLeft = "5px";
        logoutBtn.style.transition = "all 0.3s ease"; 
        logoutBtn.style.fontWeight = "bold"; 
        logoutBtn.style.cursor = "pointer"; 

        // Now Add hover effect using JavaScript
        logoutBtn.addEventListener("mouseover", () => {
            logoutBtn.style.backgroundColor = "#e63939"; // Darker red on hover
            logoutBtn.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Add shadow
        });

        logoutBtn.addEventListener("mouseout", () => {
            logoutBtn.style.backgroundColor = "#ff4d4d"; // Reset to original color
            logoutBtn.style.boxShadow = "none"; 
        });

        // Add click event to clear login status and authToken
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("authToken");
            window.location.reload(); // Reload the page to update UI
        });

        // Append the Logout button to the navbar
        const navbar = document.querySelector(".nav-links");
        if (navbar) {
            const listItem = document.createElement("li");
            listItem.appendChild(logoutBtn);
            navbar.appendChild(listItem);
        }

        // Hide Sign Up and Sign In buttons
        const authButtons = document.getElementById("auth-buttons");
        if (authButtons) {
            authButtons.style.display = "none";
        }
    }
});