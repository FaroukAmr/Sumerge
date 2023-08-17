import { movieData } from './movieData.js';

const loadMovieDetails = () => {
  // Retrieve the video query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  const movie = movieData.find((movie) => movie.id == videoId);

  // Get the video player element and set the video source
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
