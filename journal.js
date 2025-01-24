// journal.js
document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-container");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `"<p class="text-white">No favorites added yet.</p>`;
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

        // Remove from Favorites Button
        const removeButton = document.createElement("button");
        removeButton.classList =
            "mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600";
        removeButton.textContent = "Remove from favorites";

        // Add Event Listener to Remove Button
        removeButton.addEventListener("click", () => {
            const updatedFavorites = favorites.filter(
                (fav) => fav.id !== movie.id
            );
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            alert(`${movie.title} has been removed from favorites.`);
            location.reload(); // Refresh the page to update the list
        });

        // Append elements
        movieContent.appendChild(movieTitle);
        movieContent.appendChild(movieOverview);
        movieContent.appendChild(removeButton);

        movieCard.appendChild(imgContainer);
        movieCard.appendChild(movieContent);

        favoritesContainer.appendChild(movieCard);
    });
});
