
console.log("Client side javscript file is loaded")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

// messageOne.textContent = 'From javscript'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  console.log(location)
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      // location was not found
      if (data.cod === '404') {
        messageOne.textContent = 'Unable to find location. Try another search'
        messageTwo.textContent = ''
      } else {
        console.log(data)
        messageOne.textContent = data.weather[0].description
        messageTwo.textContent = 'The temperature is ' + data.main.temp + ' degress'
      }
    })
  })
})

