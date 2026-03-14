import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-7xl font-extrabold text-purple-500">
        404
      </h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Página no encontrada
      </p>

      <p className="mt-2 text-gray-500 max-w-md">
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </p>
    
      <Link
        to="/"
        className="mt-8 inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold uppercase px-6 py-3 rounded-lg transition-colors duration-300"
      >
        Volver al Inicio
      </Link>

    </div>
  )
}
