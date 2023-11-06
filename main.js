const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events`;
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const partyName = document.querySelector('#partyname');

async function getPartys() {

    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;}
 
function render(partys) {
  const template = partys.map(party => {
    return (
      `<section>
        <h2>${party.name}</h2>
        <h3>${party.location}</h3>
        <h4>${party.date}</h4>
        <p>${party.description}</p>

        <button data-id="${party.id}">Delete Party</button>
      </section>`
    )
  }).join('');
  mainEl.innerHTML = template;
}

async function PartyApp() {
  const partys = await getPartys();
  render(partys);
}

PartyApp();

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: partyname.value,
        location: location.value,
        date: date.value,
        description: description.value,
      })
    });
  
    partyname.value = '';
    date.value = '';
    description.value = '';
    locations.value = '';
  
    PartyApp();
});

mainEl.addEventListener('click', async (event) => {
  if(event.target.matches('button')) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}`, {
      method: 'DELETE',
    });
    PartyApp();
  }
}); 

