export const getSearchRes = async (key) => {
    const keyEncoded = encodeURIComponent(key);
    const res = await fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=3cec0bc2453e606c1e852682fe0b861d&query=${keyEncoded}`,
    );
    const movies = res.json();

    return movies;
};
