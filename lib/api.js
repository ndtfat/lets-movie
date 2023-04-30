export const getSearchRes = async (key, limit, page = 1) => {
    const keyEncoded = encodeURIComponent(key);
    const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=3cec0bc2453e606c1e852682fe0b861d&query=${keyEncoded}&page=${page}`,
    );
    const data = await res.json();
    const returnData = await data.results
        .map((result) => {
            const movie =
                result.media_type === 'person' && result !== undefined
                    ? result.known_for[0]
                    : result;

            return movie;
        })
        .filter((result, index) => {
            if (limit) return data.results.length < limit ? data.results.length : index < limit;
            return true;
        });
    return returnData;
};

export const getGenreList = async (type) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=3cec0bc2453e606c1e852682fe0b861d`,
    );
    const data = await res.json();
    return data;
};

export const getTrending = async (media_type = all, time_window = day, limit) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=3cec0bc2453e606c1e852682fe0b861d`,
    );
    const data = await res.json();
    const returnData = await data.results
        .map((movie) => {
            return {
                ...movie,
                backdrop_path: `${process.env.API_IMG}${movie.backdrop_path}`,
                poster_path: `${process.env.API_IMG}${movie.poster_path}`,
            };
        })
        .filter((result, index) => {
            if (limit) return data.results.length < limit ? data.results.length : index < limit;
            return true;
        });
    return returnData;
};

export const getPopular = async (media_type, page, limit) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/${media_type}/popular?api_key=3cec0bc2453e606c1e852682fe0b861d&page=${page}`,
    );
    const data = await res.json();
    const returnData = await data.results
        .map((movie) => {
            return {
                ...movie,
                backdrop_path: `${process.env.API_IMG}${movie.backdrop_path}`,
                poster_path: `${process.env.API_IMG}${movie.poster_path}`,
            };
        })
        .filter((result, index) => {
            if (limit) return data.results.length < limit ? data.results.length : index < limit;
            return true;
        });

    return returnData;
};
