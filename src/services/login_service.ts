interface User {
    name: string;
    email: string;
}

export class LoginService {

    authentication = async (user: User) => {
        const url = "https://frontend-take-home-service.fetch.com/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            return response.ok
        } catch (error: any) {
          console.error(error.message);
        }
        return false
    }

    logoutUser = async () => {
        await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        localStorage.removeItem('is_user_login')
        console.log("Logged out successfully!")
    }

    validation = (user: User) => {

        const isEmailValid = () => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) }
        let errors: string[] = []
        if (user.name.trim() === '') {errors.push('Name cannot be empty.')}
        if (!isEmailValid()) {errors.push('Invalid email format.')}

        return errors
    }
}

export const loginService = new LoginService()