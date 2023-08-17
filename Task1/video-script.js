import { movieData } from './utils/movieData.js';

const loadMovieDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  const movie = movieData.find((movie) => movie.id == videoId);

  const videoPlayer = document.querySelector('iframe');
  const movieNameElement = document.getElementById('movie-name');
  const movieDescriptionElement = document.getElementById('movie-description');

  videoPlayer.src = movie.trailerLink;
  movieNameElement.textContent = movie.title;
  movieDescriptionElement.textContent = movie.year;

  document.title = movie.title;
};

document.addEventListener('DOMContentLoaded', () => {
  loadMovieDetails();
});
