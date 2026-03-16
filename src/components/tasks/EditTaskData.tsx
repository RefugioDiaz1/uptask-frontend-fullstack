import { useLocation, useNavigate, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    
    const {data, isLoading, error} = useQuery({
        queryKey:['task', taskId],
        queryFn: ()=> getTaskById({projectId, taskId}),
        retry: false,
        enabled: !!taskId
    })


    if(isLoading) return 'Cargando...'
            
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

   if(data) return (
    <EditTaskModal 
    data={data}
    taskId={taskId}/>
  )
}
