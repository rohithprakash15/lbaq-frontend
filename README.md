# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# lbaq-backend

## Overview

This is a backend service built using FastAPI for managing users, news, queries, and answers. It uses MongoDB as the database.

## API Endpoints

### General

#### `GET /`

- **Description**: Returns a welcome message.
- **Response**:
  ```json
  { "message": "Hello everyone" }
  ```

---

### User Management

#### `POST /user/signup`

- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "aadhar": "string",
    "phone_number": "string",
    "location": "string",
    "is_officer": true
  }
  ```
- **Response**:
  ```json
  { "message": "User registered successfully" }
  ```

#### `POST /user/login`

- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  { "message": "Login successful" }
  ```

#### `GET /user/{email}`

- **Description**: Fetches user details by email.
- **Response**:
  ```json
  {
    "name": "string",
    "email": "string",
    "aadhar": "string",
    "phone_number": "string",
    "location": "string",
    "is_officer": true
  }
  ```

---

### News Management

#### `GET /news/{location}`

- **Description**: Fetches news by location.
- **Response**:
  ```json
  [
    {
      "email": "string",
      "title": "string",
      "description": "string",
      "department": "string",
      "location": "string"
    }
  ]
  ```

#### `POST /add-news`

- **Description**: Adds news (only officers can post news).
- **Request Body**:
  ```json
  {
    "email": "string",
    "title": "string",
    "description": "string",
    "department": "string",
    "location": "string"
  }
  ```
- **Response**:
  ```json
  { "message": "News posted successfully" }
  ```

---

### Query Management

#### `POST /add-query`

- **Description**: Adds a query.
- **Request Body**:
  ```json
  {
    "email": "string",
    "title": "string",
    "description": "string",
    "department": "string",
    "location": "string"
  }
  ```
- **Response**:
  ```json
  { "message": "Query posted successfully" }
  ```

#### `GET /queries/{location}/{department}`

- **Description**: Fetches queries by location and department.
- **Response**:
  ```json
  [
    {
      "email": "string",
      "title": "string",
      "description": "string",
      "department": "string",
      "location": "string"
    }
  ]
  ```

---

### Answer Management

#### `POST /queries/answer`

- **Description**: Adds an answer to a query (only officers can post answers).
- **Request Body**:
  ```json
  {
    "query_id": "string",
    "email": "string",
    "response": "string"
  }
  ```
- **Response**:
  ```json
  { "message": "Answer posted successfully" }
  ```

---

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file specifies the build and routing configuration.

## Environment Variables

- `SECRET_KEY`: Used for password encoding.
- `MONGO_URL`: MongoDB connection string.

## License

This project is licensed under the MIT License.
