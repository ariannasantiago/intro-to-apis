# User Service

This service manages users for a company.

*Rather than connecting to an external data source, the service manipulates an in-memory collection, meaning the collection is reset when the server restarts.*

## Local Setup

```sh
# Prerequisites (if not already installed)
brew install nvm
nvm install 14
npm i -g nodemon

# Switch to Node 14
nvm use

# Install dependencies
npm i

# Run
nodemon
```

The application will run at <http://localhost:3000> (the port can be changed in `index.js`).

*Note:* `nodemon` will restart the server for every code change. If you don't want this, you can run `node index.js` instead; you will have to restart the server manually to propagate any code changes.

## Models

### User

```json
{
    "username": "string",
    "firstName": "string",
    "lastName": "string"
}
```

### UserUpdate

```json
{
    "firstName": "string",
    "lastName": "string"
}
```

### Error

```json
{
    "error": "string"
}
```

## Endpoints

The following endpoints are included in the Postman collection (see `postman.json`). If you don't have Postman installed, you can download it at [postman.com/downloads](https://www.postman.com/downloads/). To import a collection, select _Import_ in the top-left corner, then select _Upload Files_ and choose `postman.json` in this directory. You can also use the cURL commands in `curls.sh`.

1. [Health check](https://github.com/ryanlawson/intro-to-apis#health-check)
2. [Get all users](https://github.com/ryanlawson/intro-to-apis#get-all-users)
3. [Get a specific user by username](https://github.com/ryanlawson/intro-to-apis#get-a-specific-user-by-username)
4. [Create a new user](https://github.com/ryanlawson/intro-to-apis#create-a-new-user)
5. [Update an existing user by username or create a new one with a specific username](https://github.com/ryanlawson/intro-to-apis#update-an-existing-user-by-username-or-create-a-new-one-with-a-specific-username)
6. [Delete a specific user by username](https://github.com/ryanlawson/intro-to-apis#delete-a-specific-user-by-username)

### Health check

#### Request

- Endpoint: `GET /health`

#### Responses

- Status: `200 OK`
    - Description: The health check always returns a `200 OK` response.

### Get all users

#### Request

- Endpoint: `GET /users`

#### Responses

- Status: `200 OK`
    - Description: The users are successfully returned (with `[]` if there are no users).
    - Body: `User[]`
    - Header: `Content-Type` gives the format of the response (`application/json`).

### Get a specific user by username

#### Request

- Endpoint: `GET /users/{username}`
    - `username` is the username of the user.

#### Responses

- Status: `200 OK`
    - Description: The user with the specified user is returned.
    - Body: `User`
    - Header: `Content-Type` gives the format of the response (`application/json`).
- Status: `404 Not Found`
    - Description: No user with the specified username was found.

### Create a new user

#### Request

- Endpoint: `POST /users`
- Body: `User`

#### Responses

- Status: `201 Created`
    - Description: The user was successfully created.
    - Header: `Location` gives the address of the new user.
- Status: `400 Bad Request`
    - Description: Something is wrong with the request body.
    - Body: `Error`
    - Header: `Content-Type` gives the format of the response (`application/json`).

### Update an existing user by username or create a new one with a specific username

#### Request

- Endpoint: `PUT /users/{username}`
    - `username` is the username of the user.
- Body: `UserUpdate`

#### Responses

- Status: `204 No Content`
    - Description: The user was successfully updated.
- Status: `201 Created`
    - Description: The user was successfully created.
    - Header: `Location` gives the address of the new user.
- Status: `400 Bad Request`
    - Description: Something is wrong with the request body.
    - Body: `Error`
    - Header: `Content-Type` gives the format of the response (`application/json`).

### Delete a specific user by username

#### Request

- Endpoint: `DELETE /users/{username}`
    - `username` is the username of the user.

#### Responses

- Status: `204 No Content`
    - Description: The user was successfully deleted.
- Status: `404 Not Found`
    - Description: No user with the specified username was found.
