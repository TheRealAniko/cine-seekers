// fav-button.js
import { getFavorites, setFavorites } from "./storage.js";

export const createAddFavBtn = (movie) => {
    const button = document.createElement("button");
    button.classList =
        "mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600";
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
    });

    return button;
};
