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
const fetchApi = async (apiUrl, page, limit, media_type) => {
    console.log('apiUrl: ', apiUrl);
    const res1 = await fetch(`${apiUrl}&page=${page * 2 + 1}`);
    const data1 = await res1.json();

    const res2 = await fetch(`${apiUrl}&page=${page * 2}`);
    const data2 = await res2.json();
    const data = data1.results.concat(data2.results);

    const returnData = await data
        .filter((movie) => movie !== undefined)
        .map((movie) => {
            return {
                ...movie,
                backdrop_path: movie.backdrop_path ? `${IMG_PATH}${movie.backdrop_path}` : noImgUrl,
                poster_path: movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : noImgUrl,
                media_type: movie.media_type || media_type,
            };
        })
        .filter((result, index) => {
            if (limit) return data.length < limit ? data.length : index < limit;
            return true;
        });

    return returnData;
};

export const getSearchRes = async (key, about = 'multi', limit, page = 1) => {
    const keyEncoded = encodeURIComponent(key);
    const searchResList = fetchApi(
        `https://api.themoviedb.org/3/search/${about}?api_key=3cec0bc2453e606c1e852682fe0b861d&query=${keyEncoded}`,
        page,
        limit,
        about,
    );
    return searchResList;
};

export const getTrending = async (media_type = all, time_window = day, limit, page = 1) => {
    const trendingList = await fetchApi(
        `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
        media_type,
    );
    return trendingList;
};

export const getPopular = async (media_type, page = 1, limit) => {
    const popularList = fetchApi(
        `https://api.themoviedb.org/3/${media_type}/popular?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
        media_type,
    );
    return popularList;
};

export const getTopRated = async (media_type, page = 1, limit) => {
    const topratedList = fetchApi(
        `https://api.themoviedb.org/3/${media_type}/top_rated?api_key=3cec0bc2453e606c1e852682fe0b861d`,
        page,
        limit,
        media_type,
    );
    return topratedList;
};

export const getLatest = async (media_type, page = 1, limit) => {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const latest_date = `${year}-${month}-${day}`;

    const latestList = fetchApi(
        `https://api.themoviedb.org/3/discover/${media_type}?api_key=3cec0bc2453e606c1e852682fe0b861d&sort_by=release_date.desc&release_date.lte=${latest_date}&with_watch_monetization_types=free`,
        page,
        limit,
        media_type,
    );
    return latestList;
};

export const getUpcomingMovies = async (page = 1, limit) => {
    const upcomingList = fetchApi(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=3cec0bc2453e606c1e852682fe0b861d&language=en-US`,
        page,
        limit,
        'movie',
    );
    return upcomingList;
};

export const getDiscoverList = async (
    media_type,
    genres = [],
    from = '',
    to = '',
    sort_by = 'release_date',
    page = 1,
    limit,
) => {
    const genresEncoded = encodeURIComponent(genres.join(','));

    const list = fetchApi(
        `https://api.themoviedb.org/3/discover/${media_type}?api_key=3cec0bc2453e606c1e852682fe0b861d&sort_by=${sort_by}.desc&release_date.gte=${to}&release_date.lte=${from}&with_genres=${genresEncoded}&with_watch_monetization_types=free`,
        page,
        limit,
        media_type,
    );
    return list;
};

export const getDetail = async (media_type, id) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=3cec0bc2453e606c1e852682fe0b861d&append_to_response=credits,similar`,
    );
    const data = await res.json();

    console.log('data: ', data);

    const detail = {
        ...data,
        backdrop_path: data.backdrop_path ? `${IMG_PATH}${data.backdrop_path}` : noImgUrl,
        poster_path: data.poster_path ? `${IMG_PATH}${data.poster_path}` : noImgUrl,
        similar: data.similar.results
            .filter((item, index) => index < 5)
            .map((item) => {
                return {
                    ...item,
                    backdrop_path: item.backdrop_path
                        ? `${IMG_PATH}${item.backdrop_path}`
                        : noImgUrl,
                    poster_path: item.poster_path ? `${IMG_PATH}${item.poster_path}` : noImgUrl,
                    media_type: media_type,
                };
            }),
    };

    return detail;
};

export const getMovie = async (imdb_id) => {
    const res = await fetch(`https://www.2embed.cc/embed/${imdb_id}`);
    const data = await res.json();

    return data;
};
