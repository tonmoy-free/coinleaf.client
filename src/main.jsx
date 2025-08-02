import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { router } from './router/Router.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'aos/dist/aos.css';
import Aos from 'aos';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
Aos.init();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode >,
)
