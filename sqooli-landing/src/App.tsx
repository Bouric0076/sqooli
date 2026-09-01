import './styles/pages/landing/landing.css'
import './styles/responsive/final-mobile.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'

export default function App() {
	return <RouterProvider router={router} />
}
