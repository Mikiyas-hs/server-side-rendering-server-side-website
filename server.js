// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'
 
// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';
 
 
const apiEndpoint = "https://fdnd-agency.directus.app/items/dropandheal_"
const apiTask = "task"
const apiExercise = "exercise"
 
 
 
//console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
const taskResponse = await fetch(`${apiEndpoint}${apiTask}`)
const exerciseResponse = await fetch(`${apiEndpoint}${apiExercise}`)
 
// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const taskResponseJSON = await taskResponse.json()
const exerciseResponseJSON = await exerciseResponse.json()
 
 
// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
 //console.log(apiResponseJSON)
 
 
// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()
 
// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))
 
// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());
 
// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')
 
// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
  const taskResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":1}')
  const exerciseResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"task":1}')
  const taskResponseJSON = await taskResponse.json()
  const exerciseResponseJSON = await exerciseResponse.json()
  
    response.render('index.liquid', {
    tasks: taskResponseJSON.data,
    exercise: exerciseResponseJSON.data})
  })



  



















  //10/03
  //Route path: /users/:userId/books/:bookId
 //Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})
 
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)
 
// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`let's go application started on http://localhost:${app.get('port')}`)
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

