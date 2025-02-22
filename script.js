// Optional dynamic features
document.querySelector('.search-btn').addEventListener('click', () => {
    const query = document.querySelector('.search-input').value;
    alert(`Searching for: ${query}`);
});
