// Initialization of TMDP API_KEY & URLs
const API_KEY = "e1db7731774da84825c6ecc635ee0aea"; // Replace with your TMDB API key (Timur)
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export { API_KEY, API_URL, IMAGE_BASE_URL };

// Function to fetch movies from TMDB API (Timur) -> network module
export const fetchMovies = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
        moviesContainer.innerHTML =
            "<p class='text-red-500'>Failed to load movies. Please try again later.</p>";
    }
}

// Function to fetch popular movies -> network module
export const fetchPopMovs = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=e1db7731774da84825c6ecc635ee0aea&language=en-US&page=1"
        );
        if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Function to search for keywords -> network module
export const fetchKeywordResults = async (query) => {
    const API_URL = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(
        query
    )}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(
                `Error fetching keyword results. Status: ${response.status}`
            );
        }
        const data = await response.json();
        console.log("Keyword Search Results:", data);
        return data.results;
    } catch (error) {
        console.error("Error fetching keyword search results:", error);
        return [];
    }
};

// Function to fetch movies based on a keyword ID -> network module
export const fetchMoviesByKeyword = async (keywordId) => {
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_keywords=${keywordId}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(
                `Error fetching movies for keyword. Status: ${response.status}`
            );
        }
        const data = await response.json();
        console.log("Movies for Keyword:", data);
        return data.results;
    } catch (error) {
        console.error("Error fetching movies by keyword:", error);
        return [];
    }
};