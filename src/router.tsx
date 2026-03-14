import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import NotFoundPage from '@/views/NotFoundPage'
import EditProjectView from './components/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'

export default function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                <Route path='/' element={<DashboardView />} index />
                <Route path='/projects/create' element={<CreateProjectView />}  />
                <Route path='/projects/:projectId' element={<ProjectDetailsView />}  />
                <Route path='/projects/:projectId/edit' element={<EditProjectView />}  />
                <Route path='*' element={<NotFoundPage />}  />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}


