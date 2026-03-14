import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import type { Project } from "@/types/index";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type PropsProjectsDetail = {
  project: Project;
};

export default function ProjectListCard({ project }: PropsProjectsDetail) {

       
        const queryClient = useQueryClient();
        
      const {mutate} = useMutation({
        mutationFn: deleteProject,
        onError: (error)=>{
          toast.error(error.message);
        },
        onSuccess:(data)=>{
    
          toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projects']})
          
        }
      })

  return (
    <li
      key={project._id}
      className="flex justify-between gap-x-6 px-5 py-10 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <Link
            to={`/projects/${project._id}`}
            className="text-gray-600 hover:text-indigo-600 hover:underline text-3xl font-bold transition-colors"
          >
            {project.projectName}
          </Link>
          <p className="text-sm text-gray-400">Cliente: {project.clientName}</p>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/projects/${project._id}`}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Ver Proyecto
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/projects/${project._id}/edit`}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Editar Proyecto
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => mutate(project._id)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      active ? "bg-red-50 text-red-600" : "text-red-500"
                    }`}
                  >
                    Eliminar Proyecto
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
