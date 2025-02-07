import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigator = useNavigate()

    const logoutClick = () => {
        localStorage.removeItem("is_user_login")
        window.dispatchEvent(new Event("storage"))
        navigator('/login', { replace: true })
    }

    return(
        <main className="page p-0" id="landing_page">
            Landing Page

            <button id="logoutBtn" onClick={logoutClick}>Logout</button>
            
        </main>
    )
}

export default LandingPage