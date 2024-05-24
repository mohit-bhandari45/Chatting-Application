import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Chat from './pages/Chat.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import SetAvatar from './pages/SetAvatar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/setavatar",
    element: <SetAvatar />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
