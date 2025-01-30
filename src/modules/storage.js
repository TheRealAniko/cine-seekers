const FAVORITES_KEY = "favoriteMovies";

// Get favorites from local storage
export function getFavorites() {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    try {
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem(FAVORITES_KEY);
        return [];
    }
}

// Store favorites to local storage
export function setFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Remove favorites per ID
export function removeFavoriteById(id) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
}

// Verification whether movie is already added
export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(movie => movie.id === id);
}