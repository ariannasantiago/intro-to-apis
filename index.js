const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

// Fake data store
let users = [{
  "username": "@ry",
  "firstName": "Ryan",
  "lastName": "Lawson"
},{
  "username": "@vince",
  "firstName": "Vince",
  "lastName": "Charming"
}]

app.get('/health', (req, res) => {
  console.log('Responding to health check request.')
  res
    .status(200)
    .send()
})

app.get('/users', (req, res) => {
  console.log('Retrieving all users.')
  res
    .status(200)
    .header('Content-Type', 'application/json')
    .send(users)
})

app.post('/users', (req, res) => {
  console.log('Creating a user.')
  if(!req.body.username || !req.body.firstName || !req.body.lastName) {
    console.error(`Missing required fields: ${req.body}.`)
    res
      .status(400)
      .header('Content-Type', 'application/json')
      .send('{"error": "Requests must contain a username, firstName, and lastName."}')
  } else if(!!users.find(u => u.username === req.body.username)) {
    console.error(`User ${req.body.username} already exists.`)
    res
      .status(400)
      .header('Content-Type', 'application/json')
      .send('{"error": "Unable to create new user."}')
  } else {
    users.push({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName})
    res
      .status(201)
      .header('Location', `/users/${req.body.username}`)
      .send()
  }
})

app.get('/users/:username', (req, res) => {
  console.log(`Retrieving user ${req.params.username}.`)
  const user = users.find(u => u.username === req.params.username)
  if(!user) {
    console.error(`User ${req.params.username} does not exist.`)
    res
      .status(404)
      .send()
  } else {
    res
      .status(200)
      .header('Content-Type', 'application/json')
      .send(user)
  }
})

app.put('/users/:username', (req, res) => {
  const username = req.params.username
  console.log(`Responding to update/create request for ${username}.`)
  const userIndex = users.findIndex(u => u.username === username)
  if(!req.body.firstName || !req.body.lastName) {
    console.error(`Missing required fields: ${req.body}.`)
    res
      .status(400)
      .header('Content-Type', 'application/json')
      .send('{"error": "Requests must contain a firstName and lastName."}')
  } else if (userIndex === -1) {
    console.log(`Creating new user ${username}.`)
    users.push({username: username, firstName: req.body.firstName, lastName: req.body.lastName})
    res
      .status(201)
      .header('Location', `/users/${username}`)
      .send()
  } else {
    console.log(`Updating user ${username}.`)
    users[userIndex] = {username: username, firstName: req.body.firstName, lastName: req.body.lastName}
    res
      .status(204)
      .send()
  }
})

app.delete('/users/:username', (req, res) => {
  const username = req.params.username
  console.log(`Deleting user ${username}.`)
  const userIndex = users.findIndex(u => u.username === username)
  if(userIndex === -1) {
    console.error(`User ${username} does not exist.`)
    res
      .status(404)
      .send()
  } else {
    users.splice(userIndex, 1)
    res
      .status(204)
      .send()
  }
})

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`)
})
