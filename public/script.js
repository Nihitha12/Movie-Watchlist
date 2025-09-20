const API_URL = 'http://localhost:3000/movies';

const movieForm = document.getElementById('movie-form');
const titleInput = document.getElementById('title');
const movieList = document.getElementById('movie-list');

async function fetchMovies() {
  const res = await fetch(API_URL);
  const movies = await res.json();

  movieList.innerHTML = '';
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${movie.title}
      <span class="status">${movie.status}</span>
      <button onclick="toggleStatus('${movie._id}', '${movie.status}')">Toggle</button>
      <button onclick="deleteMovie('${movie._id}')">Delete</button>
    `;
    movieList.appendChild(li);
  });
}

movieForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  titleInput.value = '';
  fetchMovies();
});

async function deleteMovie(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchMovies();
}

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Want to watch' ? 'Watched' : 'Want to watch';

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  fetchMovies();
}

fetchMovies();
