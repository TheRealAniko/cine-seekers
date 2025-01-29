const FAVORITES_KEY = "favoriteMovies";

// ✅ Holt Favoriten aus LocalStorage (mit Fehler-Handling)
export function getFavorites() {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    try {
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("❌ Invalid JSON in localStorage:", error);
        localStorage.removeItem(FAVORITES_KEY);
        return [];
    }
}

// ✅ Speichert Favoriten in LocalStorage
export function setFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// ✅ Entfernt Favoriten nach ID
export function removeFavoriteById(id) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
}

// ✅ Prüft, ob ein Film in den Favoriten ist
export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(movie => movie.id === id);
}