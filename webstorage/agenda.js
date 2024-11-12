let contacts = []
const key = 'agenda-memory'

// recuperiamo i riferimenti ai 3 campi
const firstNameInput = document.getElementById('firstName')
const lastNameInput = document.getElementById('lastName')
const phoneInput = document.getElementById('phone')

// riferimento al form
const myForm = document.getElementById('user-form')

// creiamo la classe User
class User {
  constructor(_firstName, _lastName, _phone) {
    this.firstName = _firstName
    this.lastName = _lastName
    this.phone = _phone
  }
}

myForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const utente = new User(
    firstNameInput.value,
    lastNameInput.value,
    phoneInput.value
  )

  console.log('UTENTE CREATO', utente)

  // per prima cosa cercheremo di creare una card nella pagina per rappresentare l'utente creato
  // prendo un riferimento alla row delle cards
  const cardsRow = document.getElementById('cards-container')
  const newCol = document.createElement('div')
  newCol.classList.add('col', 'col-12', 'col-md-4') // <div class="col col-12 col-md-4">
  newCol.innerHTML = `
    <div class="card">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" class="card-img-top" alt="generic user picture">
      <div class="card-body">
        <h5 class="card-title">${utente.firstName} ${utente.lastName}</h5>
        <p class="card-text">
          Numero di telefono: ${utente.phone}
        </p>
        <a href="#" class="btn btn-primary">Contatta</a>
      </div>
    </div>
  `
  // appendere la colonna alla riga
  cardsRow.appendChild(newCol)
  // bello! però tutto quello che aggiungiamo nella pagina è "volatile"...
  // aggiungiamo l'utente appena creato ad un array, e salviamo questo array ad ogni nuova card in localStorage!
  contacts.push(utente) // si riempie ad ogni nuovo utente
  // lo salvo nel localStorage
  // localStorage.setItem(key, contacts) // <-- SBAGLIATO
  localStorage.setItem(key, JSON.stringify(contacts)) // <-- CORRETTO
  // perchè contacts è una struttura dati complessa, un array di oggetti!
})

// all'avvio della pagina controllo se "agenda-memory" in localStorage esiste e ha un contenuto
const memory = localStorage.getItem(key)
if (memory) {
  // se memory non è null...
  // ...dobbiamo ripartire da lei come punto di partenza!
  const savedContacts = JSON.parse(memory)
  console.log('ARRAY CONTATTI RECUPERATO', savedContacts)
  // ora creo una lista di cards a partire da questo array di contatti salvati
  // e riassegno l'array "contacts" a questo nuovo punto di partenza, così eventuali NUOVI elementi della rubrica si accodano a quelli recuperati
  contacts = savedContacts
  savedContacts.forEach((utente) => {
    const cardsRow = document.getElementById('cards-container')
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-md-4') // <div class="col col-12 col-md-4">
    newCol.innerHTML = `
      <div class="card">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" class="card-img-top" alt="generic user picture">
        <div class="card-body">
          <h5 class="card-title">${utente.firstName} ${utente.lastName}</h5>
          <p class="card-text">
            Numero di telefono: ${utente.phone}
          </p>
          <a href="#" class="btn btn-primary">Contatta</a>
        </div>
      </div>
    `
    cardsRow.appendChild(newCol)
  })
}
