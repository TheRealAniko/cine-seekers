// Import of network module functions
import {
    fetchMovies,
    fetchPopMovs,
    fetchKeywordResults,
    fetchMoviesByKeyword
} from "./modules/network.js";

// Import of UI module functions
import {
    displayMovies,
    displayPopMovs,
    renderResults
} from "./modules/ui.js";

// Import of storage module functions
import {
    getFavorites,
    setFavorites,
    removeFavoriteById,
    isFavorite
} from "./modules/storage.js";


// Wait for DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM Content Loaded!");

    const moviesContainer = document.getElementById("movies");
    const popMovs = document.querySelector("#popular-movie-container");

    // Fetch movies
    const movies = await fetchMovies();
    if (movies.length > 0) {
        displayMovies(movies);
    } else {
        moviesContainer.innerHTML = "<p class='text-red-500'>No movies available.</p>";
    }

    // Fetch popular movies
    const popMovies = await fetchPopMovs();
    if (popMovies.length > 0) {
        const top10Movies = popMovies.slice(0, 10);
        top10Movies.forEach(movie => displayPopMovs(movie, popMovs));
    } else {
        console.log("No popular movies to display.");
    }

    // Update favorites
    updateFavoriteUI();

    // Initialize search elements
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.getElementById("resultCards");
    const resultsSection = document.getElementById("results-section");

    // Search and display results
    const handleSearch = async () => {
        const query = searchInput.value.trim();
        if (!query) {
            alert("Please enter a valid search term!");
            return;
        }

        const keywordResults = await fetchKeywordResults(query);
        if (!keywordResults.length) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No results found for "${query}".</p>`;
            return;
        }

        const keywordId = keywordResults[0].id;
        const movies = await fetchMoviesByKeyword(keywordId);

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

// Update UI to display favorites
const updateFavoriteUI = () => {
    const favoriteContainer = document.getElementById("favorite-movies");
    if (!favoriteContainer) return;

    const favorites = getFavorites();
    favoriteContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoriteContainer.innerHTML = "<p class='text-gray-500'>No favorites added.</p>";
    } else {
        favorites.forEach(movie => {
            const movieItem = document.createElement("div");
            movieItem.classList = "p-2 bg-gray-800 text-white rounded";

            movieItem.innerHTML = `
                <h3 class="text-lg">${movie.title}</h3>
                <button class="mt-2 px-2 py-1 bg-red-500 rounded remove-fav" data-id="${movie.id}">Remove</button>
            `;

            favoriteContainer.appendChild(movieItem);
        });

        // Event Listener "Remove"-Buttons
        document.querySelectorAll(".remove-fav").forEach(button => {
            button.addEventListener("click", (event) => {
                const movieId = parseInt(event.target.dataset.id);
                removeFavoriteById(movieId);
                updateFavoriteUI();
            });
        });
    }
};