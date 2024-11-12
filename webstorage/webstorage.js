// Le WEB STORAGE API nascono con la standardizzazione di HTML5, al fine di migliorare una tecnologia esistente (cookies).
// Li migliorano superando le loro 2 limitazioni principali:
// 1) I cookies possono memorizzare al massimo 4KB di dati
// 2) I cookies non erano stati pensati per il concetto di "sessione"

// La soluzione è stata introdurre DUE nuove tecnologie (i motori di web storage) per lo stoccaggio di dati lato client (browser) a breve/medio termine:
// a) localStorage (che memorizza dei dati fino al proprio svuotamento)
// b) sessionStorage (che memorizza dei dati fino alla chiusura del tab/browser)

// entrambe queste memorie possiedono uno spazio di allocazione pari a 5MB, e memorizzano le informazioni separatamente "per dominio"

// I metodi per l'interazione con queste API sono condivisi:
// - setItem() per salvare un dato
// - getItem() per leggere un dato
// - removeItem() per rimuovere un dato
// - clear() per svuotare l'intero contenuto della memoria in questo dominio

// Per cosa si utilizzano genericamente queste memorie? Vengono principalmente utilizzate per migliorare la UX dell'utente, ricordando preferenze, temi colore, token di accesso etc.
// se queste informazioni si perdono, pazienza! bisognerà re-impostare le preferenze del sito, rifare il login etc.
// ricordiamoci solamente di non inserire dati sensibili, password, ruoli utente etc. perchè come vedremo il localStorage/sessionStorage sono COMPLETAMENTE ESPOSTI ALL'UTENTE.

// cominciamo ad utilizzare i 4 metodi scritti sopra:
// inseriamo un dato nel localStorage:
localStorage.setItem('theme', 'dark')
localStorage.setItem('username', 'Giulio')
// con setItem inseriamo una proprietà, scrivendo prima il nome della chiave (il nome della proprietà) e poi il suo valore
localStorage.setItem('numero', 100) // inserisce una coppia chiave:valore nella memoria selezionata

// sessionStorage e localStorage nascono per memorizzare valori di STRINGHE!
// per quanto JS sia abbastanza bravo a convertire tipi primitivi in stringa (es. numeri, booleani, etc.) però fa veramente schifo nel salvare entità dati complesse! quindi array e oggetti NON vengono salvati correttamente.

// questo significa che NON si possono salvare array ed oggetti in local/sessionStorage? no, ma c'è bisogno di un passaggio aggiuntivo (cioè dobbiamo trovare il modo di convertire queste strutture dati in una stringa nel modo corretto!)

// per RECUPERARE questi dati, utilizziamo .getItem()
const currentTheme = localStorage.getItem('theme') // 'dark'
const user = localStorage.getItem('username') // 'Giulio'

const div = document.createElement('div')
const p = document.createElement('p')
p.innerText = user // assegno 'Giulio' come contenuto del p
div.appendChild(p)
document.querySelector('main').appendChild(div)

// localStorage.removeItem('username') // questa riga ELIMINA una chiave
// localStorage.clear() // TABULA RASA del localStorage

// vediamo ora come sia possibile "stringhifizzare" in maniera funzionante e non distruttiva entità dati complesse, come potrebbero essere oggetti o array.
localStorage.setItem('object', { name: 'Stefano' })
// la riga superiore va a inserire nel localStorage una chiave con valore "[object Object]"

// metodo corretto:
localStorage.setItem('object-correct', JSON.stringify({ name: 'Stefano' }))
// ora il valore di questa chiave è l'oggetto reso stringa in formato JSON
// l'oggetto ora è salvato nella sua variante stringa "corretta"
// da questa stringa è sempre possibile ritornare alla sua versione "originale"

const originalObject = JSON.parse(localStorage.getItem('object-correct'))
console.log(originalObject)
// con questa tecnica di JSON.stringify() + JSON.parse() voi potete rendere stringa e viceversa qualsiasi entità dati complessa!

const arrayOfObjects = [
  {
    name: 'Pedro',
    species: 'dog',
  },
  {
    name: 'Pascal',
    species: 'cat',
  },
  {
    name: 'Jamie',
    species: 'Lannister',
  },
]

// localStorage.setItem('GoT', arrayOfObjects) // [object Object]
localStorage.setItem('GoT', JSON.stringify(arrayOfObjects)) // [{"name": "Pedro", etc.}]

// abbiamo salvato correttamente l'array di oggetti nel localStorage, in formato stringa JSON
// quando lo recupererò, sarà sempre una stringa!
const arrayAsAString = localStorage.getItem('GoT')
const arrayAgain = JSON.parse(arrayAsAString) // questo è l'array originale!
console.log(arrayAgain[1])
