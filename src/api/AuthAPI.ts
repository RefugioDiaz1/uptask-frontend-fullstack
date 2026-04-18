import api from '@/lib/axios'
import type { ChecnPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UpdatedPasswordUser, UserLoginForm, UserProfileForm, UserRegistrationForm } from '../types'
import { getErrorMessage } from '@/lib/handleError'
import  {userSchema} from '@/types/index'

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
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function forGotPassword(formData: ForgotPasswordForm){

    try {
        const URL = `/auth/forgot-password`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function validateToken(formData: ConfirmToken){

    try {
        const URL = `/auth/validate-token`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function updatePasswordWithToken({formData, token}: {formData : NewPasswordForm, token: ConfirmToken['token']}){

    try {
        const URL = `/auth/update-password/${token}`
        const {data} = await api.post<string>(URL,formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function getUser(){
    try {
        const {data}  = await api('/auth/user')
        const response = userSchema.safeParse(data)
        if(response.success)
        {
            return response.data
        }
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function updateProfile({formData} : {formData : UserProfileForm}){
    try {
        
        const {data}  = await api.put<string>('/auth/profile',formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}

export async function updatedPasswordProfileForm({formData} : {formData : UpdatedPasswordUser}){
    try {
        
        const {data}  = await api.put<string>('/auth/update-password',formData)
        return data
    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}


export async function checkPassword(formData : ChecnPasswordForm){

    try {
        const {data}  = await api.post<string>('/auth/check-password',formData)
        return data

    } catch (error) {
        throw new Error(getErrorMessage(error))
    }
}