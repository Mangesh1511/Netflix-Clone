var apikey = "f0103facb96200b1d4bc6e2d6dfe86fc";
const basic_url = `https://api.themoviedb.org/3/movie/550?api_key=f0103facb96200b1d4bc6e2d6dfe86fc`;
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apiPaths = {

    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`

}
function init() {

    // alert('Your app is working Fine');
    // fetchandBuildMovieSection(apiPaths.fetchTrending,'Trending now')
    fetchTrendingMovies();
    fetchandBuildAllsections();


}

function fetchandBuildAllsections() {

    fetch(apiPaths.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchandBuildMovieSection(apiPaths.fetchMoviesList(category.id), category.name)
                })

            }

            // console.table(categories);
        })
        .catch(err => console.log(err));

}

function fetchTrendingMovies() {

 list =fetchandBuildMovieSection(apiPaths.fetchTrending, 'Trending Now')
        console.log(list);





}

function buildBannersection(movie) {
    console.log("IN build banner section:\n");
    console.log(movie);

    const banner_ele = document.getElementById('banner-content');
    banner_ele.style.backgroundImage(`${imgPath}${movie.backdrop_path}`);
}



function fetchandBuildMovieSection(fetchUrl, category) {
    // console.log(fetchUrl, category);

    fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            console.table(res.results);
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMovieSection(movies, category);
            }
            if(category==='Trending Now'){return movies;}
        }
        )
        .catch(err => console.log(err));
}



function buildMovieSection(list, category) {
    console.log(list, category);
    const moviesCont = document.getElementById('movies-cont');
    const moviesListHTML = list.map(item => {
        return `
       
    <img class="movie-items" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
 
    `;

    }).join('');



    const movieSectionHTML =
        `
        <h2 class="movies-section-and-heading">${category}<span class="explore">Explore All</span></h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div>
        `;
    // console.log(moviesListHTML);
    console.log(movieSectionHTML);

    const div = document.createElement('div');
    div.className = 'movie-section';
    div.innerHTML = movieSectionHTML;

    //appned html into movies container
    console.log(movieSectionHTML);
    moviesCont.append(div);


}



window.addEventListener('load', function () {
    init();
});