import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import axios from 'axios'
import {Provider} from "react-redux"
import { store } from './components/store/index.js'



axios.defaults.baseURL = "http://localhost:5000"
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={store} >
    <App />
    </Provider>

    
    </BrowserRouter>
 
)
