import { Link } from "react-router-dom"
import {useQuery} from '@tanstack/react-query'
import {  getProjects } from "@/api/ProjectAPI"
import ProjectListCard from "@/components/projects/ProjectsListCard"
import {toast} from 'react-toastify'

export default function DashboardView() {

  const {data,error, isLoading} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })


  if(isLoading) return 'Cargando...'
  
  if (error) {
    toast.error(error.message);
    return <p>{error.message}</p>;
  }

  if (data) return (
    <>
    <h1 className="text-5xl font-black"> Mis Proyectos</h1>
    <p className="text-2xl font-light text-gray-500 mt-5">
      Maneja y Administra tus Proyectos
    </p>
    <nav className="my-5">
      <Link to='/projects/create' className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white
                      text-xl font-bol cursor-pointer transition-colors">
    Nuevo Proyecto
    </Link>
    </nav>

    {data.length ? (

       <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
    {data.map((project) => (
      <ProjectListCard 
      key={project._id}
      project = {project}
      />
    ))}
</ul>

    ) : (

        <p className="text-center py-20 ">No hay Proyectos Aún {''}
        <Link className="text-fuchsia-500 font-bold"
        to='/projects/create'>
          Crear Proyecto
        </Link>
        </p>
    )  
  }
    </>
  )
}
