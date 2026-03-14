import {z} from 'zod'


/** Tasks */
export const taskStatusSchema = z.enum(["pending" , "onHold" ,"inProgress" , "underReview" , "completed"])

export const taskSchema = z.object(
    {
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        project: z.string(),
        status: taskStatusSchema
    }
)


export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
/** Projects */

export const projectSchema = z.object(
    {
        _id: z.string(),
        clientName: z.string(),
        projectName: z.string(),
        description: z.string(),
    }
)

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName:true,
        description: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


//Se puede usar Omit pero si crece el shema entonces entonces que agregar todo lo que quiero omitir, por eso el pick para indicar
//Que solo tales campos usare
