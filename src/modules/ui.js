// Import functions from storage
import { getFavorites, setFavorites, removeFavoriteById, isFavorite } from "./storage.js";

// Add favorites button
export const createAddFavBtn = (movie) => {
    const button = document.createElement("button");
    button.classList = "mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600";
    button.textContent = "Add to favorites";

    button.addEventListener("click", () => {
        const favorites = getFavorites();
        if (!favorites.some((fav) => fav.id === movie.id)) {
            favorites.push(movie);
            setFavorites(favorites);
            alert(`${movie.title} has been added to your favorites`);
        } else {
            alert(`${movie.title} is already in your favorites`);
        }
        updateFavoriteUI(); //
    });

    return button;
};

// Display popular movies
export const displayPopMovs = (movie, container) => {
    const movCard = document.createElement("div");
    movCard.className = "movie-card rounded-md flex-shrink-0 flex flex-col items-center";

    const poster = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
    const movImg = document.createElement("img");
    movImg.src = poster;
    movImg.alt = movie.title;
    movImg.className = "object-fit w-full rounded-md";

    const movTitle = document.createElement("h3");
    movTitle.className = "font-semibold text-white mb-1";
    movTitle.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.className = "font-light text-xs italic pb-4";
    releaseDate.textContent = movie.release_date;

    // Add to favorites button
    const favButton = createAddFavBtn(movie);

    movCard.appendChild(movImg);
    movCard.appendChild(movTitle);
    movCard.appendChild(releaseDate);
    movCard.appendChild(favButton); 
    container.appendChild(movCard);
};

// Render search results
export const renderResults = (results) => {
    const resultsContainer = document.querySelector("#resultCards");
    if (!resultsContainer) {
        console.error("#resultCards not found in the DOM");
        return;
    }

    resultsContainer.innerHTML = "";

    results.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.classList = "bg-white rounded-lg p-4 flex gap-4";

        const imgContainer = document.createElement("div");
        imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
        const img = document.createElement("img");
        img.classList = "max-h-48 w-auto rounded-md";
        img.src = result.poster_path
            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
            : "https://via.placeholder.com/150";
        img.alt = result.title || "No title";
        imgContainer.appendChild(img);

        const resultContent = document.createElement("div");
        resultContent.classList = "flex-1";
        const resultTitle = document.createElement("h3");
        resultTitle.classList = "text-lg font-semibold text-gray-900 mb-2";
        resultTitle.textContent = result.title || "No title";

        const resultOverview = document.createElement("p");
        resultOverview.classList = "text-sm text-gray-700 leading-relaxed";
        resultOverview.textContent = result.overview || "No overview available.";

        // Add to favorites button
        const favButton = createAddFavBtn(result);
        resultContent.appendChild(resultTitle);
        resultContent.appendChild(resultOverview);
        resultContent.appendChild(favButton); 

        resultItem.appendChild(imgContainer);
        resultItem.appendChild(resultContent);
        resultsContainer.appendChild(resultItem);
    });

    console.log("✅ Suchergebnisse gerendert!");
};

// Display favorites in UI
export const updateFavoriteUI = () => {
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

        // ✅ Event listener remove-buttons
        document.querySelectorAll(".remove-fav").forEach(button => {
            button.addEventListener("click", (event) => {
                const movieId = parseInt(event.target.dataset.id);
                removeFavoriteById(movieId);
                updateFavoriteUI(); 
            });
        });
    }
};

// ✅ Display favorites in UI (for `journal.html`)
export const renderFavorites = () => {
    const favoritesContainer = document.getElementById("favorites-container");

    if (!favoritesContainer) {
        console.error("❌ Fehler: #favorites-container nicht gefunden!");
        return;
    }

    favoritesContainer.innerHTML = "";

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `<p class="text-white">No favorites added yet.</p>`;
        return;
    }

    favorites.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList = "bg-white rounded-lg p-4 flex gap-4";

        // Movie poster
        const imgContainer = document.createElement("div");
        imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
        const img = document.createElement("img");
        img.classList = "max-h-48 w-auto rounded-md";
        img.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150";
        img.alt = movie.title || "No title";
        imgContainer.appendChild(img);

        // Movie details
        const movieContent = document.createElement("div");
        movieContent.classList = "flex-1";

        const movieTitle = document.createElement("h3");
        movieTitle.classList = "text-lg font-semibold text-gray-900 mb-2";
        movieTitle.textContent = movie.title || "No title";

        const movieOverview = document.createElement("p");
        movieOverview.classList = "text-sm text-gray-700 leading-relaxed";
        movieOverview.textContent = movie.overview || "No overview available.";

        // Remove from favorites button
        const removeButton = document.createElement("button");
        removeButton.classList = "mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600";
        removeButton.textContent = "Remove from favorites";
        removeButton.addEventListener("click", () => {
            removeFavoriteById(movie.id);
            renderFavorites();
        });

        movieContent.appendChild(movieTitle);
        movieContent.appendChild(movieOverview);
        movieContent.appendChild(removeButton);
        movieCard.appendChild(imgContainer);
        movieCard.appendChild(movieContent);
        favoritesContainer.appendChild(movieCard);
    });
};