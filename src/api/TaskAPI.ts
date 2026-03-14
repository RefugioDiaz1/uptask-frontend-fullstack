import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/handleError";
import type { TaskFormData, Project } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>){

    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data

    } catch (error) {
        throw new Error(getErrorMessage(error))
    }

}