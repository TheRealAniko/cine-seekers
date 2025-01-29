// ✅ Importiere API-Funktionen aus network.js
import {
    fetchMovies,
    fetchPopMovs,
    fetchKeywordResults,
    fetchMoviesByKeyword
} from "./modules/network.js";

// ✅ Importiere UI-Funktionen aus ui.js
import {
    displayPopMovs,
    renderResults,
    updateFavoriteUI
} from "./modules/ui.js";

// 🎬 Warten, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", async () => {
    console.log("📢 DOM geladen!");

    const popMovs = document.querySelector("#popular-movie-container");

    // 🎥 Popular Movies für Slideshow abrufen & anzeigen
    const popMovies = await fetchPopMovs();
    console.log("📢 Popular Movies received in index.js:", popMovies);
    if (popMovies.length > 0) {
        const top10Movies = popMovies.slice(0, 10);
        top10Movies.forEach(movie => displayPopMovs(movie, popMovs));
    } else {
        console.log("❌ No popular movies to display.");
    }

    // 🎥 Favoriten in der UI anzeigen
    updateFavoriteUI();

    // 🔎 Such-Funktion
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.getElementById("resultCards");
    const resultsSection = document.getElementById("results-section");

    const handleSearch = async () => {
        const query = searchInput.value.trim();
        console.log(`🔎 Suche nach: "${query}"`);
        if (!query) {
            alert("Please enter a valid search term!");
            return;
        }

        const keywordResults = await fetchKeywordResults(query);
        console.log("📢 Keyword API response:", keywordResults);
        if (!keywordResults.length) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No results found for "${query}".</p>`;
            return;
        }

        const keywordId = keywordResults[0].id;
        console.log(`🔄 Fetching movies with keyword ID: ${keywordId}`);

        const movies = await fetchMoviesByKeyword(keywordId);
        console.log("📢 Movies found by keyword:", movies);

        if (movies.length === 0) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No movies found for the keyword "${query}".</p>`;
        } else {
            renderResults(movies);
        }

        resultsSection.classList.remove("hidden");
    };

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

    searchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        handleSearch();
    });
});