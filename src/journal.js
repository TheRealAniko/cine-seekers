// ✅ Importiere UI-Funktion zum Rendern der Favoriten
import { renderFavorites, createAddFavBtn } from "./modules/ui.js";

// ✅ Favoriten anzeigen, sobald `journal.html` geladen wird
document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 Journal-Page geladen!");
    renderFavorites();
});
