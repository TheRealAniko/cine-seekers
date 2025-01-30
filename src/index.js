// Importort fetch-functions from network.js
import {
    fetchMovies,
    fetchPopMovs,
    fetchKeywordResults,
    fetchMoviesByKeyword
} from "./modules/network.js";

// Import UI-functions from ui.js
import {
    displayPopMovs,
    renderResults,
    updateFavoriteUI
} from "./modules/ui.js";

// Wait for DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM loaded!");
    console.log("DOM loaded!");

    const popMovs = document.querySelector("#popular-movie-container");

    // Slide show popular movies
    const popMovies = await fetchPopMovs();
    console.log("Popular Movies received in index.js:", popMovies);
    console.log("Popular Movies received in index.js:", popMovies);
    if (popMovies.length > 0) {
        const top10Movies = popMovies.slice(0, 10);
        top10Movies.forEach(movie => displayPopMovs(movie, popMovs));
    } else {
        console.log("No popular movies to display.");
        console.log("No popular movies to display.");
    }

    // Display favorites
    updateFavoriteUI();

    // Search function
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.getElementById("resultCards");
    const resultsSection = document.getElementById("results-section");

    const handleSearch = async () => {
        const query = searchInput.value.trim();
        console.log(`Searching for: "${query}"`);
        if (!query) {
            alert("Please enter a valid search term!");
            return;
        }

        const keywordResults = await fetchKeywordResults(query);
        console.log("Keyword API response:", keywordResults);
        console.log("Keyword API response:", keywordResults);
        if (!keywordResults.length) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No results found for "${query}". Try a different keyword.</p>`;
            return;
        }

        const keywordId = keywordResults[0].id;
        console.log(`Fetching movies with keyword ID: ${keywordId}`);
        console.log(`Fetching movies with keyword ID: ${keywordId}`);

        const movies = await fetchMoviesByKeyword(keywordId);
        console.log("Movies found by keyword:", movies);
        console.log("Movies found by keyword:", movies);

        if (movies.length === 0) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No movies found for the keyword "${query}".</p>`;
        } else {
            renderResults(movies);
        }

        // Display results
        resultsSection.classList.remove("hidden");
    };

        // Event listener keypress
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

        // Event listener button
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        handleSearch();
    });
});


//Filter Part - Timur
// Add Filter Options for Movies
const filters = {
    genre: "",
    language: "",
    rating: "",
    showtime: "",
};

// DOM Elements for Filters
const genreFilter = document.getElementById("genreFilter");
const languageFilter = document.getElementById("languageFilter");
const ratingFilter = document.getElementById("ageRatingFilter");
const showtimeFilter = document.getElementById("showtimeFilter");

// Populate Filter Dropdowns (Static Options)
const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
const languages = ["English", "Spanish", "French", "German", "Hindi"];
const ratings = ["G", "PG", "PG-13", "R", "NC-17"];
const showtimes = ["Morning", "Afternoon", "Evening", "Night"];

// Helper to Populate Dropdowns
function populateDropdown(dropdown, options) {
    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

// Populate Filters
populateDropdown(genreFilter, genres);
populateDropdown(languageFilter, languages);
populateDropdown(ratingFilter, ratings);
populateDropdown(showtimeFilter, showtimes);

// Event Listeners for Filters
function applyFilters() {
    const filteredMovies = movies.filter((movie) => {
        return (
            (filters.genre ? movie.genre_ids.includes(filters.genre) : true) &&
            (filters.language
                ? movie.original_language === filters.language
                : true) &&
            (filters.rating
                ? movie.vote_average >= parseRating(filters.rating)
                : true) &&
            (filters.showtime ? filterByShowtime(movie.release_date) : true)
        );
    });
    displayMovies(filteredMovies);
}

// Filter Event Handlers
[genreFilter, languageFilter, ratingFilter, showtimeFilter].forEach(
    (filterElement) => {
        filterElement.addEventListener("change", (event) => {
            filters[event.target.id.replace("Filter", "").toLowerCase()] =
                event.target.value;
            applyFilters();
        });
    }
);

// Helper Functions for Filtering
function parseRating(rating) {
    switch (rating) {
        case "G":
            return 1;
        case "PG":
            return 3;
        case "PG-13":
            return 5;
        case "R":
            return 7;
        case "NC-17":
            return 9;
        default:
            return 0;
    }
}

function filterByShowtime(releaseDate) {
    const currentHour = new Date().getHours();
    switch (filters.showtime) {
        case "Morning":
            return currentHour >= 6 && currentHour < 12;
        case "Afternoon":
            return currentHour >= 12 && currentHour < 18;
        case "Evening":
            return currentHour >= 18 && currentHour < 22;
        case "Night":
            return currentHour >= 22 || currentHour < 6;
        default:
            return true;
    }
}

// Fetch Movies and Apply Filters
let movies = [];
async function fetchMoviesWithFilters() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        movies = data.results;
        applyFilters();
    } catch (error) {
        console.error("Error fetching movies:", error);
        moviesContainer.innerHTML =
            "<p class='text-red-500'>Failed to load movies. Please try again later.</p>";
    }
}

// Call fetchMoviesWithFilters on Page Load
document.addEventListener("DOMContentLoaded", fetchMoviesWithFilters);