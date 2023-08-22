import './App.css'
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import LoginForm from './LoginForm'

function App() {
    const baseUrl = 'http://localhost:8000'

    return (
        <>
        <AuthProvider>
            <LoginForm

        </AuthProvider>
        </>
    )
}
