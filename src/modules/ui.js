// ✅ Importiere Storage-Funktionen für Favoriten
import { getFavorites, setFavorites, removeFavoriteById, isFavorite } from "./storage.js";

// ✅ Funktion: Popular Movies anzeigen (Slideshow)
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

    // 🔄 Elemente hinzufügen
    movCard.appendChild(movImg);
    movCard.appendChild(movTitle);
    movCard.appendChild(releaseDate);
    container.appendChild(movCard);
};

// ✅ Funktion: Suchergebnisse rendern
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
        resultOverview.textContent =
            result.overview || "No overview available.";

        resultContent.appendChild(resultTitle);
        resultContent.appendChild(resultOverview);
        resultItem.appendChild(imgContainer);
        resultItem.appendChild(resultContent);

        resultsContainer.appendChild(resultItem);
    });

    console.log("Rendering Completed");
};

// ✅ Funktion: Favoriten in der UI anzeigen
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

        // ✅ Event Listener für "Remove"-Buttons
        document.querySelectorAll(".remove-fav").forEach(button => {
            button.addEventListener("click", (event) => {
                const movieId = parseInt(event.target.dataset.id);
                removeFavoriteById(movieId);
                updateFavoriteUI();
            });
        });
    }
};

// ✅ Funktion: Favoriten in der UI anzeigen (für `journal.html`)
export const renderFavorites = () => {
    const favoritesContainer = document.getElementById("favorites-container");

    if (!favoritesContainer) {
        console.error("❌ Fehler: #favorites-container nicht gefunden!");
        return;
    }

    favoritesContainer.innerHTML = ""; // 🧹 Bestehende Inhalte löschen

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `<p class="text-white">No favorites added yet.</p>`;
        return;
    }

    favorites.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList = "bg-white rounded-lg p-4 flex gap-4";

        // 📌 Movie Poster
        const imgContainer = document.createElement("div");
        imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
        const img = document.createElement("img");
        img.classList = "max-h-48 w-auto rounded-md";
        img.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150";
        img.alt = movie.title || "No title";
        imgContainer.appendChild(img);

        // 📌 Movie Details
        const movieContent = document.createElement("div");
        movieContent.classList = "flex-1";

        const movieTitle = document.createElement("h3");
        movieTitle.classList = "text-lg font-semibold text-gray-900 mb-2";
        movieTitle.textContent = movie.title || "No title";

        const movieOverview = document.createElement("p");
        movieOverview.classList = "text-sm text-gray-700 leading-relaxed";
        movieOverview.textContent = movie.overview || "No overview available.";

        // 📌 Remove from Favorites Button
        const removeButton = document.createElement("button");
        removeButton.classList = "mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600";
        removeButton.textContent = "Remove from favorites";
        removeButton.addEventListener("click", () => {
            removeFavoriteById(movie.id);
            renderFavorites(); // **🔄 Statt `location.reload()` → Live-Update**
        });

        // 🔗 Elemente zusammenfügen
        movieContent.appendChild(movieTitle);
        movieContent.appendChild(movieOverview);
        movieContent.appendChild(removeButton);
        movieCard.appendChild(imgContainer);
        movieCard.appendChild(movieContent);
        favoritesContainer.appendChild(movieCard);
    });
};