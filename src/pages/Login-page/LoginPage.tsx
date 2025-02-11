import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginService } from "../../services/login_service.ts"
import "./login_page.scss"
import { RESOURCE_FOLDER } from "../../resource_base.ts"

const LoginPage = () => {

    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const navigator = useNavigate()

    const loginOnClick =  async () => {

        const userInfo = {
            name: userName,
            email: userEmail
        }

        const newErrors = loginService.validation(userInfo)
        setErrors(newErrors)

        if (newErrors.length === 0) {
            const isResponseOk = await loginService.authentication(userInfo)
            console.log(isResponseOk)

            if (isResponseOk) {
                localStorage.setItem('is_user_login', 'true')
                window.dispatchEvent(new Event("storage"))
                navigator('/home-page', { replace: true })
            }
        }
    }

    return(
        <main className="page" id="login_page">
            <h1 className="main_title">Welcome to Fetch a Match</h1>
            <div id="main_description">
                <p>Find your perfect furry friend with ease! Log in to browse adorable dogs, filter by breed, and save your favorites. 
                <br/>Once you've found your top picks, we'll help you generate the best match based on your preferences.</p>
                <p className="center_text">How It Works:</p>
                <ul>
                    <li>Enter your name and email to log in.</li>
                    <li>Search for available dogs and apply filters to find the perfect fit.</li>
                    <li>Save your favorites and generate a match!</li>
                </ul>
                <p className="center_text">Ready to find your four-legged companion? Log in to get started!</p>
            </div>
            <section id="loginBox">
                <div className="loginField">
                    <label>Name</label>
                    <div>
                        <input 
                            type="text" 
                            id="userName_input"
                            value={userName} 
                            onChange={(e) => {
                                setUserName(e.target.value)

                                if (errors.length > 0) {
                                    setErrors(loginService.validation({
                                        name: userName,
                                        email: userEmail
                                    }))
                                }
                            }}
                        />
                        {errors.includes('Name cannot be empty.') 
                            ?
                            <p className="inputError">Name cannot be empty.</p> 
                            :
                            null
                        }
                    </div>
                </div>

                <div className="loginField">
                    <label>Email</label>
                    <div>
                        <input 
                            type="text" 
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmail(e.target.value)
                                if (errors.length > 0) {
                                    setErrors(loginService.validation({
                                        name: userName,
                                        email: userEmail
                                    }))
                                }
                            }}
                        />
                        {
                            errors.includes('Invalid email format.') 
                                ?
                            <p className="inputError">Invalid email format.</p> 
                                :
                            null
                        }
                    </div>
                </div>
                <div className="loginField">
                    <button id="loginButton" onClick={() => {loginOnClick()}}>Login</button>
                </div>
            </section>
            <img id="loginImg" src={`${RESOURCE_FOLDER}/icons/paw.png`} alt="Login Image fetch & Match"/>
        </main>
    )
}

export default LoginPage