import {z} from 'zod'

/** Auth & Users */
export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' |'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password'|'password_confirmation'>
export type UpdatedPasswordUser = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>
export type ChecnPasswordForm = Pick<Auth, 'password'>

export type ConfirmToken = Pick<Auth, 'token'>


/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email:true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** Notes */
const noteShema = z.object({
        _id: z.string(),
        content: z.string(),
        createdBy: userSchema,
        task: z.string(),
        createdAt: z.string()
})

export type Note = z.infer<typeof noteShema>
export type NoteFormData = Pick<Note, 'content'>

/** Tasks */
export const taskStatusSchema = z.enum(["pending" , "onHold" ,"inProgress" , "underReview" , "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>  

export const taskSchema = z.object(
    {
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        project: z.string(),
        status: taskStatusSchema,
        completedBy: z.array(z.object(
            {   
                _id: z.string(),
                user: userSchema,
                status: taskStatusSchema
            }
        )),
        notes:z.array(noteShema),
        createdAt: z.string(),
        updatedAt: z.string()
    }
)

export const taskPreviewSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status : true
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskPreviewSchema>

/** Projects */

export const projectSchema = z.object(
    {
        _id: z.string(),
        clientName: z.string(),
        projectName: z.string(),
        description: z.string(),
        tasks: z.array(taskPreviewSchema),
        team: z.array(z.string()),
        //manager: z.string(userSchema.pick({_id :true} )),
        manager: z.string()
    }
)


export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName:true,
        description: true,
        manager:true
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true
})
export type projectType = Pick<Project, '_id' | 'projectName' | 'clientName' | 'description' | 'manager'>
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


//Se puede usar Omit pero si crece el shema entonces entonces que agregar todo lo que quiero omitir, por eso el pick para indicar
//Que solo tales campos usare



/** Team */
export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const teamMemberSchemaArray = z.array(
    teamMemberSchema
)

export const teamMemberFormSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>

