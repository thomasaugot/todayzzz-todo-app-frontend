# TODAYZZZ TODOS - Frontend

![sqdhdd-removebg-preview](https://github.com/thomasaugot/typescript-todo-app-frontend/assets/117474095/664d2d99-bfb6-4325-8ecb-2673f62cfef9)

This is the frontend of my todo list app I named TODAYZZZ TODOS, providing a RESTful API for managing users, collections, and todo items.

## Tech stack

- React.js
- Typescript
- SCSS
- Initial database was built using Supabase's BaaS. I am currently working on switching it to a custom server I built using PostgrSQL. Link to this repo: https://github.com/thomasaugot/todayzzz-todo-app-backend

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/thomasaugot/typescript-todo-app-frontend
   ```

2. Go to the project directory:

   ```shell
   cd typescript-todo-app-frontend
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

4. Configure environment variables:

Create a .env file in the project root directory and define the necessary environment variables, such as database connection details, as needed. You can use the .env.example file as a template.

```shell
DATABASE_URL=your_database_url
PORT=3001
```

5. Start the server:

   ```shell
   npm start
   ```

The server should now be running and listening on the specified port.

Backend code: https://github.com/thomasaugot/ts-todo-app-backend <br>
Live version of the app: https://todayzzz-todos.netlify.app/
