import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/handleError";
import type { TaskFormData, Project, Task } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>){

    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data

    } catch (error) {
        throw new Error(getErrorMessage(error))
    }

}

export async function getTaskById({projectId, taskId}:Pick<TaskAPI, 'projectId' | 'taskId'>){

    try {
        const url = `/projects/${projectId}/task/${taskId}`
        const {data} =await api.get(url)
        return data

    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function updateTask({projectId, taskId, formData}:Pick<TaskAPI, 'projectId'|'taskId'|'formData'>)
{
    try {
        const url = `/projects/${projectId}/task/${taskId}`
        const {data} =await api.put<string>(url,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function deleteTask({projectId, taskId}:Pick<TaskAPI, 'projectId'|'taskId'>)
{
    try {
        const url = `/projects/${projectId}/task/${taskId}`
        const {data} =await api.delete<string>(url)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}