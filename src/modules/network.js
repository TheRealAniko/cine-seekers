// TMDB API Key and URLs
const API_KEY = "e1db7731774da84825c6ecc635ee0aea";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

// ✅ Fetch movies
export const fetchMovies = async () => {
    try {
        console.log("🔄 Fetching Movies...");
        const response = await fetch(MOVIE_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("✅ Movies fetched successfully:", data);
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

// ✅ Fetch popular movies 
export const fetchPopMovs = async () => {
    try {
        console.log("🔄 Fetching Popular Movies...");
        const res = await fetch(MOVIE_API_URL);
        if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
        const data = await res.json();
        console.log("✅ Popular Movies fetched:", data);
        return data.results;
    } catch (error) {
        console.log("❌ Error fetching Popular Movies:", error);
        return [];
    }
};

// ✅ Fetch keyword results
export const fetchKeywordResults = async (query) => {
    const API_URL = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    try {
        console.log(`🔍 Searching for keyword: ${query}`);
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching keyword results. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("✅ Keyword Search Results:", data);
        return data.results;
    } catch (error) {
        console.error("❌ Error fetching keyword search results:", error);
        return [];
    }
};

// ✅ Fetch movies by keyword ID
export const fetchMoviesByKeyword = async (keywordId) => {
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_keywords=${keywordId}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching movies for keyword. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching movies by keyword:", error);
        return [];
    }
};

// ✅ Export constants
export { API_KEY, IMAGE_BASE_URL };