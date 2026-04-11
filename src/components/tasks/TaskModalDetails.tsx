import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import type { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    //Obtener el id del proyecto
    const params = useParams()
    const projectId = params.projectId!

    /** Leer si el modal existe  */
    const location = useLocation()
    const queryParams= new URLSearchParams(location.search)
    const taskId  = queryParams.get('viewTask')!
    
    const show = taskId ? true: false

    const {data,isLoading, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: ()=> getTaskById({projectId, taskId}),
        retry:false,
        enabled: !!taskId
    })

    const {mutate,reset} = useMutation({
        mutationFn: updateStatus,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            reset()
            toast.success(data)
            navigate(location.pathname, {
        replace: true,
      });
        }

    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    {

        const status = e.target.value as TaskStatus
            const data = {
                projectId,
                taskId,
                status
            }

            mutate(data)
    }
    

     if(isLoading) return 'Cargando...'
                
                   if (error) {

                    //En dado caso quiero llevar al usuario a otro lado, pero que no marque error de algo que este en la url
                    //return <Navigate to={`/projects/${projectId}`} />
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
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: { formatDate(data.updatedAt) }</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                        {data.completedBy.length ? (
                                            <>
                                                <p className='text-2xl text-slate-500 mb-2'>Historial de Cambios</p>
                                        <ul className='list-decimal'>
                                           {data.completedBy.map((activityLog)=>(

                                            <li key={activityLog._id}>
                                                <span className='font-bold text-slate-600'>
                                                    { statusTranslations[activityLog.status]}
                                                </span>{' '} por: {activityLog.user.name}
                                                
                                            </li>
                                        ) )}
                                        </ul>
                                            </>

                                        ) : null}
                                        
                                       

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: </label>
                                        <select
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}>
                                            {Object.entries(statusTranslations).map(([key,value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}    
                                        </select>
                                    </div>

                                    <NotesPanel />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}