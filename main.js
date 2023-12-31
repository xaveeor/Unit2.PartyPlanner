const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events`;
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const partyName = document.querySelector('#partyName');
const locations = document.querySelector('#locations');
const date = document.querySelector('#date');
const description = document.querySelector('#description');
const state = [];


async function getPartys() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data)
    return data.data;
    
  }
 
function render(partys) {
  console.log("adding data")
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
};



async function partyApp() {
  console.log("rendering")
  const partys = await getPartys();
  render(partys);
}
partyApp();


formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const dateData = new Date(date.value).toISOString();
  try{
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: partyName.value,
        description: description.value,
        date: dateData,
        location: locations.value,

      })
    });
  
    partyName.value = '';
    date.value = '';
    description.value = '';
    locations.value = '';
    
    partyApp();
  }catch(err){
    console.error(err);
  }
});




mainEl.addEventListener('click', async (event) => {
  if(event.target.matches('button')) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    partyApp();
  }
});
