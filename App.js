// Function to navigate to history page
function navigateToHistory() {
    window.location.href = "history.html";
}

// Function to navigate to search page
function navigateToSearch() {
    window.location.href = "index.html";
}

// Function to search for a word
function searchWord() {
    const searchInput = document.getElementById("searchInput").value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            displayWord(data[0].word, data[0].meanings[0].definitions[0].definition);
            saveToLocalStorage(searchInput, data[0].meanings[0].definitions[0].definition);
        })
        .catch(error => console.error("Error:", error));
}

// Function to display word on search page
function displayWord(word, meaning) {
    const wordContainer = document.getElementById("wordContainer");
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${word}</h2>
        <p class="mening">${meaning}</p>
      
        <button onclick="deleteWord('${word}')"<i class="fa-solid fa-trash-can"></i></button>
    `;
    wordContainer.appendChild(card);
}

// Function to save word to localStorage
function saveToLocalStorage(word, meaning) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push({ word, meaning });
    localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to display history on history page
function displayHistory() {
    const historyContainer = document.getElementById("historyContainer");
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${item.word}</h2>
            <p class="itmMean">${item.meaning}</p>
            <button onclick="deleteWord('${item.word}')"<i class="fa-solid fa-trash-can"></i></button>
        `;
        historyContainer.appendChild(card);
    });
}

// Function to delete word from localStorage and DOM
function deleteWord(word) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches = searches.filter(item => item.word !== word);
    localStorage.setItem("searches", JSON.stringify(searches));
    location.reload(); // Reload the page to reflect changes
}

// Check if current page is history page and display history if true
if (window.location.pathname.includes("history.html")) {
    displayHistory();
}

