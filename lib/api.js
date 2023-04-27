export const getSearchRes = async (key) => {
    const keyEncoded = encodeURIComponent(key);
    const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=3cec0bc2453e606c1e852682fe0b861d&query=${keyEncoded}`,
    );
    const movies = await res.json();

    return movies;
};

export const getGenreList = async (type) => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=3cec0bc2453e606c1e852682fe0b861d`);
    const genres = await res.json();

    return genres;
};
