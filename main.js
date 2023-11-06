const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events`;
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const partyName = document.querySelector('#partyname');

async function getPartys() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

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
  
    PartyApp();
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
    PartyApp();
  }
}); 
