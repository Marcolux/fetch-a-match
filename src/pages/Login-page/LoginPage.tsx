

import "./login_page.scss"
import { useState } from "react"
import { loginService } from "../../services/login_service.ts"
import { useNavigate } from "react-router-dom"

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
                        {errors.includes('Invalid email format.') 
                            ?
                            <p className="inputError">Invalid email format.</p> 
                            :
                            null
                        }
                    </div>
                </div>
                <button id="loginButton" onClick={() => {loginOnClick()}}>Login</button>
            </section>

     
        </main>
    )
}

export default LoginPage