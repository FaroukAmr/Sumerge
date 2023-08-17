import { movieData } from '../utils/movieData.js';

function populateTable() {
  const tableBody = document.querySelector('.table tbody');
  movieData.forEach((movie) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${movie.title}</td>
      <td><a href="video.html?id=${movie.id}" target="_blank">Watch Trailer</a></td>
      <td>${movie.year}</td>
    `;
    tableBody.appendChild(row);
  });
}

function populateRecommended() {
  const recommendedContainer = document.getElementById(
    'movie-recommended-container'
  );
  movieData.forEach((movie) => {
    const elm = document.createElement('element');
    elm.innerHTML = `
      <a class="movie-item" href="video.html?id=${movie.id}" target="_blank">${movie.title}</a> 
    `;
    recommendedContainer.appendChild(elm);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateTable();
  populateRecommended();
});
