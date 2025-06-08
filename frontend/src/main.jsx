import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from './contexts/UserContext.jsx'
import { FriendContextProvider } from './contexts/FriendContext.jsx'
import { MessageContextProvider } from './contexts/MessageContext.jsx'
import { SocketContextProvider } from './contexts/SocketContext.jsx'
import { PageContextProvider } from './contexts/PageContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <FriendContextProvider>
        <MessageContextProvider>
          <SocketContextProvider>
            <PageContextProvider>
              <App />
            </PageContextProvider>
          </SocketContextProvider>
        </MessageContextProvider>
      </FriendContextProvider>
    </UserContextProvider>
    <ToastContainer />
  </BrowserRouter>,
)
