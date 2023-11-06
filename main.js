const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events`;
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const recipeName = document.querySelector('#recipeName');
const instructions = document.querySelector('#instructions');

async function getRecipes() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

function render(recipes) {
  const template = recipes.map(recipe => {
    return (
      `<section>
        <h2>${recipe.name}</h2>
        <h3>${recipe.location}</h3>
        <h4>${recipe.date}</h4>
        <p>${recipe.description}</p>

        <button data-id="${recipe.id}">Delete Party</button>
      </section>`
    )
  }).join('');
  mainEl.innerHTML = template;
}

async function recipeApp() {
  const recipes = await getRecipes();
  render(recipes);
}

recipeApp();

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partyname: partyname.value,
        locations: locations.value,
        date: date.value,
        description: w.value,
      })
    });
  
    partyname.value = '';
    date.value = '';
    description.value = '';
    locations.value = '';
  
    recipeApp();
  } catch (err) {
    console.error(err);
  }
});

mainEl.addEventListener('click', async (event) => {
  if(event.target.matches('button')) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    recipeApp();
  }
});








/*
const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events`;
let repos = [];

 async function fetchRepos(){
    const response = await fetch (BASE_URL)
    const data = await response.json()
      repos = data;
      console.log(data)
      renderRepos()
 }




 repoListEl = document.querySelector('#repos');

 function renderRepos(repos){
   const template = repos.map (repo => {
      return(`<section>
      <h3>${repo.name}${repo.desription}</h3>
      </section>`
      )
   }).join('')
   repoListEl.innerHTML = template;
}
   
   


function app (){
 fetchRepos();
}


app();
*/