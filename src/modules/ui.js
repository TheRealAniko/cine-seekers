// ✅ Importiere Storage-Funktionen für Favoriten
import {
    getFavorites,
    setFavorites,
    removeFavoriteById,
    isFavorite,
} from "./storage.js";

// ✅ Funktion: "Add to Favorites"-Button erstellen
export const createAddFavBtn = (movie, isJournalPage = false) => {
    const button = document.createElement("button");
    button.classList =
        "flex items-center gap-2 transition border rounded-md p-2 w-full justify-end";

    const heartIcon = document.createElement("span");
    button.appendChild(heartIcon);

    const updateHeart = () => {
        const favorites = getFavorites();
        const isFavorite = favorites.some((fav) => fav.id === movie.id);

        heartIcon.innerHTML = isFavorite
            ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
            </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
            </svg>`;
    };

    updateHeart(); // Initial setzen

    button.addEventListener("click", () => {
        let favorites = getFavorites();
        const isFavorite = favorites.some((fav) => fav.id === movie.id);

        if (isFavorite) {
            favorites = favorites.filter((fav) => fav.id !== movie.id);
            setFavorites(favorites);

            if (isJournalPage) {
                // **Falls auf der Journal-Seite → Film sofort entfernen**
                button.closest(".movie-card").remove();
            } else {
                // **Sonst nur das Icon wechseln**
                updateHeart();
            }
            alert(`${movie.title} has been removed from favorites.`);
        } else {
            favorites.push(movie);
            setFavorites(favorites);
            updateHeart();
            alert(
                isFavorite
                    ? `${movie.title} is already in your favorites.`
                    : `${movie.title} has been added to your favorites.`
            );
        }
    });

    return button;
};

// ✅ Funktion: Popular Movies anzeigen (Slideshow)
export const displayPopMovs = (movie, container) => {
    const movCard = document.createElement("div");
    movCard.className =
        "movie-card rounded-md flex-shrink-0 flex flex-col items-center";

    const poster = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
    const movImg = document.createElement("img");
    movImg.src = poster;
    movImg.alt = movie.title;
    movImg.className = "object-fit w-full rounded-md";

    const movTitle = document.createElement("h3");
    movTitle.className = "font-semibold text-white text-center mb-1 pt-3";
    movTitle.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.className = "font-light text-xs italic pb-4";
    releaseDate.textContent = movie.release_date;

    // ✅ "Add to Favorites"-Button hinzufügen
    const favButton = createAddFavBtn(movie);

    // 🔄 Elemente hinzufügen
    movCard.appendChild(movImg);
    movCard.appendChild(movTitle);
    movCard.appendChild(releaseDate);
    movCard.appendChild(favButton); // Button wird angehängt
    container.appendChild(movCard);
};

// ✅ Funktion: Suchergebnisse rendern (mit Favoriten-Button)
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

        // ✅ "Add to Favorites"-Button hinzufügen
        const favButton = createAddFavBtn(result);
        resultContent.appendChild(resultTitle);
        resultContent.appendChild(resultOverview);
        resultContent.appendChild(favButton); // Button wird hinzugefügt

        resultItem.appendChild(imgContainer);
        resultItem.appendChild(resultContent);
        resultsContainer.appendChild(resultItem);
    });

    console.log("✅ Suchergebnisse gerendert!");
};

// ✅ Funktion: Favoriten in der UI anzeigen
export const updateFavoriteUI = () => {
    const favoriteContainer = document.getElementById("favorite-movies");
    if (!favoriteContainer) return;

    const favorites = getFavorites();
    favoriteContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoriteContainer.innerHTML =
            "<p class='text-gray-500'>No favorites added.</p>";
    } else {
        favorites.forEach((movie) => {
            const movieItem = document.createElement("div");
            movieItem.classList = "p-2 bg-gray-800 text-white rounded";

            movieItem.innerHTML = `
                <h3 class="text-lg">${movie.title}</h3>
                <button class="mt-2 px-2 py-1 bg-red-500 rounded remove-fav" data-id="${movie.id}">Remove</button>
            `;

            favoriteContainer.appendChild(movieItem);
        });

        // ✅ Event Listener für "Remove"-Buttons
        document.querySelectorAll(".remove-fav").forEach((button) => {
            button.addEventListener("click", (event) => {
                const movieId = parseInt(event.target.dataset.id);
                removeFavoriteById(movieId);
                updateFavoriteUI(); // 🔄 UI erneut aktualisieren
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
        movieCard.classList = "bg-white rounded-lg p-4 flex gap-4 movie-card";

        // 📌 Movie Poster
        const imgContainer = document.createElement("div");
        imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
        const img = document.createElement("img");
        img.classList = "max-h-48 w-auto bg-gray-300 rounded-md";
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

        // 📌 Remove from Favorites Button (jetzt mit `isJournalPage = true`)
        const favButton = createAddFavBtn(movie, true);

        // 🔗 Elemente zusammenfügen
        movieContent.appendChild(movieTitle);
        movieContent.appendChild(movieOverview);
        movieContent.appendChild(favButton);
        movieCard.appendChild(imgContainer);
        movieCard.appendChild(movieContent);
        favoritesContainer.appendChild(movieCard);
    });
};
