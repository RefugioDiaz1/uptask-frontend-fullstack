import api from '@/lib/axios'
import type { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from '../types'
import { getErrorMessage } from '@/lib/handleError'

export async function createAccount(formData: UserRegistrationForm){

    try {
        const URL = `/auth/create-account`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function confirmAccount(formData: ConfirmToken){

    try {
        const URL = `/auth/confirm-account`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){

    try {
        const URL = `/auth/request-code`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function authenticateUser(formData: UserLoginForm){

    try {
        const URL = `/auth/login`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}