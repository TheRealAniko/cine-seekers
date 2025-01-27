// storage.js

// Fetches the favorites from localStorage.
export function getFavorites() {
    const storedFavorites = localStorage.getItem("favorites");
    try {
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem("favorites"); // Entfernt defekte Daten
        return []; // Gibt ein leeres Array zurück
    }
}

// Saves the provided array of favorites into localStorage.
export function setFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Removes a favorite by its ID from the list of favorites stored in localStorage.
export function removeFavoriteById(id) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
}
