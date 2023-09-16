import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import pkg from "hbs"
import forecast from "./utils/forecast.js";

const app = express()
const handlebars = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
handlebars.registerPartials(partialsPath)

// setup static directory to setup
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Crestfallen'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Crestfallen'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    helpMessage: 'I need help, I\'m stuck stepBro',
    name: 'Crestfallen'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address is required'
    })
  }
  forecast(req.query.address, (error, { body } = {}) => {
    if (error) {
      return res.send({
        error: 'Could not reach the weather services'
      })
    } else {
      res.send(body)
    }
  })

})

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     })
//   }
//   console.log(req.query)
//   res.send({
//     products: []
//   })
// })

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Help aritcle not found',
    name: 'Crestfallen'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Page not found',
    name: 'Crestfallen'
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000")
})
