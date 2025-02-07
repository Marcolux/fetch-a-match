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
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            console.log(response)

            console.log("Request Successful:", response.ok)

            return response.ok

          
        } catch (error: any) {
          console.error(error.message);
        }

        return false
    }

    validation = (user: User) => {

        const isEmailValid = () => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) }
        let errors: string[] = []
        if (user.name.trim() === '') {errors.push('Name cannot be empty.')}
        if (!isEmailValid()) {errors.push('Invalid email format.')}

        return errors
    }

    tryThis = () => {
        console.log('this')
    }
}

export const loginService = new LoginService()