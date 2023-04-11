const refs = {
  form: document.querySelector(".form"),
  search: document.querySelector(".search"),
  btn: document.querySelector(".search-btn"),
  list: document.querySelector(".list"),
  loadMore: document.querySelector(".loadMore"),
};
let limit = 0;
let offset = 0;
refs.form.addEventListener("submit", onSubmit);
refs.loadMore.addEventListener("click", onClick);

function onSubmit(e) {
  e.preventDefault();
  const id = e.currentTarget.elements.search.value
    ? e.currentTarget.elements.search.value
    : alert("Please, enter a number from 1 to 1200");
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(url)
    .then(data => data.json())
    .then(pokemon => (refs.list.innerHTML = markup(pokemon)));

  refs.form.reset();
}

function onClick(e) {
  e.preventDefault();

  limit = 5;
  offset += 5;

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  refs.form.reset();
  fetch(url)
    .then(resp => resp.json())
    .then(res => {
      res.results.forEach(data => {
        const pokemon = data.url;
        fetch(pokemon)
          .then(pokemon => pokemon.json())
          .then(pokemon => {
            refs.list.insertAdjacentHTML("beforeend", markup(pokemon));
          });
      });
    });
}

function markup(pokemon) {
  console.log(pokemon);
  return ` <li class="box">
            <img src=${pokemon.sprites.front_default} alt="pokemon" />
            <ul class="info-list">
            <li><p class="text">name: ${pokemon.species.name}</p></li>
            <li><p class="text">base experience: ${pokemon.base_experience}</p></li>
            </ul>
            </li>
          `;
}
