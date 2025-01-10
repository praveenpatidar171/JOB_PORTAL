import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./components/auth/SignIn"
import { SignUp } from "./components/auth/SignUp"
import { Home } from "./components/Home"
import { Jobs } from "./components/Jobs"
import { Browse } from "./components/Browse"

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
    path: '/browse',
    element: <Browse />,
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
