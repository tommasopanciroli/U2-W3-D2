const key = 'notepad-memory'

// rendiamo funzionanti i tre bottoni!
// troviamogli un riferimento nel DOM
const saveButton = document.getElementById('save') // <button id="save">
const loadButton = document.getElementById('load') // <button id="load">
const resetButton = document.getElementById('reset') // <button id="reset">
// prendo anche un riferimento al mio campo textarea
const textArea = document.getElementById('notepad') // <textarea id="notepad">

saveButton.addEventListener('click', function () {
  // ora vado a salvare l'attuale contenuto della textarea nel localStorage
  // in una chiave di nome "notepad-memory"
  localStorage.setItem(key, textArea.value)
  // alert('Contenuto salvato!')
  const firstAlert = document.getElementsByClassName('alert')[0]
  firstAlert.classList.remove('d-none')
  // prendo il primo degli alert, quello di salvataggio, e gli tolgo display: none
  // svuotiamo il form
  textArea.value = '' // assegno un nuovo valore alla textarea di stringa vuota
  setTimeout(() => {
    // dopo 2sec rimetto il display: none
    firstAlert.classList.add('d-none')
  }, 2000)
})

loadButton.addEventListener('click', function () {
  // vado a vedere se esiste un contenuto precedentemente salvato nel localStorage
  const savedContent = localStorage.getItem(key)
  // savedContent ora è:
  // a) una stringa
  // b) null
  // nel caso sia null, mostriamo un alert di errore
  if (!savedContent) {
    const fourthAlert = document.getElementsByClassName('alert')[3]
    fourthAlert.classList.remove('d-none')
    setTimeout(() => {
      // dopo 2sec rimetto il display: none
      fourthAlert.classList.add('d-none')
    }, 2000)
  } else {
    // abbiamo un contenuto da ripristinare!
    // la rimettiamo come nuovo valore del notepad
    textArea.value = savedContent
    const secondAlert = document.getElementsByClassName('alert')[1]
    secondAlert.classList.remove('d-none')
    setTimeout(() => {
      // dopo 2sec rimetto il display: none
      secondAlert.classList.add('d-none')
    }, 2000)
  }
  // nel caso ci sia, lo rimetto come contenuto attuale del notepad
})

resetButton.addEventListener('click', function () {
  // svuota la textarea
  textArea.value = ''
  // elimina la chiave nel localStorage
  localStorage.removeItem(key)
  // mostrare l'alert corrispondente
  const thirdAlert = document.getElementsByClassName('alert')[2]
  thirdAlert.classList.remove('d-none')
  setTimeout(() => {
    // dopo 2sec rimetto il display: none
    thirdAlert.classList.add('d-none')
  }, 2000)
})
