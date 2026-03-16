import { isAxiosError } from "axios"

export function getErrorMessage(error: unknown): string {

    
        
    if (isAxiosError(error) && error.response?.data) {
        const data = error.response.data
        // Si hay detalles, muestra el primero (ej: "Invalid project ID")
        if (data.details?.length) return data.details[0]
        return data.error ?? 'Unknown error'
    }
    return String(error)
}