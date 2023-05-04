import noImg from '@/public/no-img.jpg';
const noImgUrl = noImg.src;
const IMG_PATH = 'https://image.tmdb.org/t/p/original';

//---------------------------------------------------------------------------------------------------------------------------------------
export const getGenreList = async (type) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=3cec0bc2453e606c1e852682fe0b861d`,
    );
    const data = await res.json();
    return data;
};

//---------------------------------------------------------------------------------------------------------------------------------------
const fetchApi = async (apiUrl, page, limit) => {
    const res1 = await fetch(`${apiUrl}&page=${page * 2 + 1}`);
    const data1 = await res1.json();

    const res2 = await fetch(`${apiUrl}&page=${page * 2}`);
    const data2 = await res2.json();
    const data = data1.results.concat(data2.results);

    const returnData = await data
        .map((movie) => {
            return {
                ...movie,
                backdrop_path: movie.backdrop_path ? `${IMG_PATH}${movie.backdrop_path}` : noImgUrl,
                poster_path: movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : noImgUrl,
            };
        })
        .filter((result, index) => {
            if (limit) return data.length < limit ? data.length : index < limit;
            return true;
        });

    return returnData;
};

export const getSearchRes = async (key, limit, page = 1) => {
    const keyEncoded = encodeURIComponent(key);
    const searchResList = fetchApi(
        `https://api.themoviedb.org/3/search/multi?api_key=3cec0bc2453e606c1e852682fe0b861d&query=${keyEncoded}`,
        page,
        limit,
    );
    return searchResList;
};

export const getTrending = async (media_type = all, time_window = day, limit, page = 1) => {
    const trendingList = await fetchApi(
        `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
    );
    return trendingList;
};

export const getPopular = async (media_type, page, limit) => {
    const popularList = fetchApi(
        `https://api.themoviedb.org/3/${media_type}/popular?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
    );
    return popularList;
};

export const getTopRated = async (media_type, page, limit) => {
    const topratedList = fetchApi(
        `https://api.themoviedb.org/3/${media_type}/top_rated?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
    );
    return topratedList;
};

export const getLatest = async (media_type, page, limit) => {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const latest_date = `${year}-${month}-${day}`;

    const latestList = fetchApi(
        `https://api.themoviedb.org/3/discover/${media_type}?api_key=3cec0bc2453e606c1e852682fe0b861d&sort_by=release_date.desc&release_date.lte=${latest_date}&with_watch_monetization_types=free`,
        page,
        limit,
    );
    return latestList;
};

export const getUpcomingMovies = async (page, limit) => {
    const upcomingList = fetchApi(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=3cec0bc2453e606c1e852682fe0b861d&language=en-US`,
        page,
        limit,
    );
    return upcomingList;
};
