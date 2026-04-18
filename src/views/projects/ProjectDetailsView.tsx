import { Link, useNavigate, useParams } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { getFullProject } from '@/api/ProjectAPI'
import {toast} from 'react-toastify'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TaskList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { useMemo } from 'react'


export default function ProjectDetailsView() {

   const {data : user,  isLoading : authLoading} = useAuth()
    
    const params = useParams()
    const navigate = useNavigate()
    const projectId = params.projectId!
    
    const {data,error, isLoading} = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
      })
      
      const canEdit = useMemo(() => data?.manager === user?._id , [data,user])
      
      if(isLoading && authLoading) return 'Cargando...'
        
       if (error) {
    toast.error(error.message)
    return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-content-center shrink-0">
            <span className="text-red-500 font-bold text-lg w-full text-center">✕</span>
          </div>

          <div>
            <p className="font-medium text-gray-900 mb-1">Algo salió mal</p>
            <p className="text-sm text-gray-500 leading-relaxed">{error.message}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-5 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← Volver
          </button>
        </div>

      </div>
    </div>
  )
}

 if(data && user) return (
   <>
      <h1 className='text-5xl font-black'>
        {data.projectName}
      </h1>
      <p className='text-2xl font-light text-gray-500 mt-5'>
        {data.description}
      </p>

      {isManager(data.manager, user._id)  && (

        <nav className='my-5 flex gap-3'>
        <button onClick={()=> navigate(location.pathname + '?newTask=true')} 
        className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
        font-bold cursor-pointer transition-colors'>
          Agregar Tarea
        </button>
        <Link to={'team'}
        className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl 
        font-bold cursor-pointer transition-colors'>
        Colaboradores 
        </Link>
      </nav>

      )}
  
      <TaskList 
      tasks= {data.tasks}
      canEdit = {canEdit}/>
      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
   </>
  )
}
