import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <Toaster />
      <HelmetProvider>
        <RouterProvider router={routes} />
      </HelmetProvider>
    </React.StrictMode>
  </AuthProvider>
)
