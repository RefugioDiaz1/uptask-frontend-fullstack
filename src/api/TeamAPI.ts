import api from "@/lib/axios"
import { type TeamMemberForm, type Project, teamMemberSchema, type TeamMember, teamMemberSchemaArray } from '../types' 
import { getErrorMessage } from '@/lib/handleError'

export async function finUserByEmail({projectId, formData}: {projectId: Project['_id'], formData: TeamMemberForm}) {

    try {
        
        const url = `/projects/${projectId}/team/find`
        const {data} = await api.post(url, formData)
        const response = teamMemberSchema.safeParse(data.user)
        if(response.success)
        {
            return response.data
        }
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function addUserToProject({projectId, id}: {projectId: Project['_id'], id:TeamMember['_id']}) {

    try {
        
        const url = `/projects/${projectId}/team/`
        const {data} = await api.post<string>(url, {id})
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function removeUserFromProject({projectId, userId}: {projectId: Project['_id'], userId:TeamMember['_id']}) {

    try {
        
        const url = `/projects/${projectId}/team/${userId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}


export async function getProjectTeam({projectId}: {projectId: Project['_id']}) {
    
    try {
        
        const url = `/projects/${projectId}/team/`
        const {data} = await api.get(url)
        const response = teamMemberSchemaArray.safeParse(data)
        if(response.success)
        {
            return response.data
        }
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}
