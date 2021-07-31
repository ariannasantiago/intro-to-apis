# Health check
curl --location --verbose --request GET 'http://localhost:3000/health'

# Get all users
curl --location --verbose --request GET 'http://localhost:3000/users'

# Get a specific user by username
curl --location --verbose --request GET 'http://localhost:3000/users/@ry'

# Create a new user
curl --location --verbose --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "@john",
    "firstName": "John",
    "lastName": "Smith"
}'

# Update an existing user by username or create a new one with a specific username
curl --location --verbose --request PUT 'http://localhost:3000/users/@john' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "@john",
    "firstName": "Jonathan",
    "lastName": "Smith"
}'

# Delete a specific user by username
curl --location --verbose --request DELETE 'http://localhost:3000/users/@john'