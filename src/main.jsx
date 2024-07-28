import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { SelectedStudentProvider } from '../src/Provider/SelectedUserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SelectedStudentProvider>
    <App />
  </SelectedStudentProvider>,
)
