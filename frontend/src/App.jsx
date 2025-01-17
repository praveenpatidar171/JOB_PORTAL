import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./components/auth/SignIn"
import { SignUp } from "./components/auth/SignUp"
import { Home } from "./components/Home"
import { Jobs } from "./components/Jobs"
import { Browse } from "./components/Browse"
import { Profile } from "./components/Profile"
import { JobDescription } from "./components/JobDescription"
import { AdminJobs } from "./components/admin/AdminJobs"
import { Companies } from "./components/admin/Companies"
import { CompanyCreate } from "./components/admin/CompanyCreate"
import { CompanySetup } from "./components/admin/CompanySetup"
import { JobCreate } from "./components/admin/JobCreate"
import { Applicants } from "./components/admin/Applicants"
import { ProtectedRoute } from "./components/admin/ProtectedRoute"


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><JobCreate /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
