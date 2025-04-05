import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))
const debil = false

root.render(
    <App clickersCount={ 4 }>
        <h1>My First React App</h1>
        <h2>hi</h2>
    </App>
)

