
# UpTask

A full-stack project and task management application built with a modern TypeScript stack. Organize your work into projects, break them down into tasks, and track progress — all through a clean and responsive interface.

## Tech Stack

**Frontend**
- React 19
- TypeScript
- React Router DOM — client-side routing
- TanStack Query — server state management and caching
- React Hook Form — form handling and validation
- Zod — schema validation
- Axios — HTTP client
- TailwindCSS — utility-first styling

**Backend**
- Node.js
- Express — REST API framework
- TypeScript
- Mongoose — MongoDB ODM
- express-validator — request validation

**Database**
- MongoDB

## Features

- Create, edit, and delete projects
- Manage tasks within each project
- Form validation on both client and server
- Centralized error handling across the API
- Consistent API response structure
- Type-safe end to end with TypeScript and Zod schemas

## Project Structure
```
uptask-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── schemas/
│   │   ├── views/
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/uptask-fullstack.git
cd uptask-fullstack
```
```bash
# Install backend dependencies
cd backend
npm install
```
```bash
# Install frontend dependencies
cd frontend
npm install
```

### Environment Variables

Create a `.env` file inside `/backend`:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

### Running the app
```bash
# Backend
cd backend
npm run dev

# Frontend (separate terminal)
cd frontend
npm run dev
```

The API will be available at `http://localhost:4000` and the frontend at `http://localhost:5173`.

## API Response Structure

All endpoints follow a consistent response format:
```json
// Success
{ "data": { ... } }

// Error
{ "error": "Human readable message", "details": ["Optional validation details"] }
```

## License

MIT


porque algunos componentes estan hechos con tailwindcss 3
npm i -D tailwindcss@3 postcss autoprefixer 

npx tailwindcss init -p

npm i react-router-dom

npm i -D @types/node

npm i @headlessui/react @heroicons/react


creando react hook form

npm i react-hook-form 


Zod nos va a funcionar para los schemas de las respuestas pero tambien para inferir los types
npm i zod

npm i axios

npm i react-toastify


REACT QUERY

npm i @tanstack/react-query

en react, cuando se le agregue el key, cuando actualizamos se queda el valor anterior, hasta que se actualiza la pagina se visualiza normal, esto es debido porque usa la cache

npm i @tanstack/react-query-devtools

crear sitios que soporten multiples idiomas
react-i18next


para ingresar codigo de 6 digitos, dependencia

npm i @chakra-ui/pin-input

interceptor de axios es una funcion que se ejecuta antes o despues de una peticion de http
interceptores de respuesta se ejecuta despues de una peticion http, para procesar una respuesta

se instala la dependencias de formularios de tailwind
npm i @tailwindcss/forms

dnd kit
para pasar las notas al otro solo arrastrandolo
npm i @dnd-kit/core

