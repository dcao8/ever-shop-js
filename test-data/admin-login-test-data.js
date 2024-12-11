export const loginSuccessfullyTestData = [
    {
        email: "daych93@gmail.com",
        password: "12345678"
    }
]

export const loginFailedTestData = [
    {
        testCase:"Login with wrong Password",
        email: "daych93@gmail.com",
        password: "1234567",
        error: "Invalid email or password"
    },
    {
        testCase:"Login with wrong Email",
        email: "daych@gmail.com",
        password: "12345678",
        error: "Invalid email or password"
    }
]

export const validateLoginFormTestData = [
    {
        testCase: "Validate Login Form in case of empty Email and Passoword",
        data: {
            "Email": {
                input: "",
                error: "This field can not be empty"
            },
            "Password": {
                input: "",
                error: "This field can not be empty"
            }
        }
    }, 
    {
        testCase: "Validate Login Form in case of invalid Email and empty Password",
        data: {
            "Email": {
                input: "day@cao",
                error: "Invalid email"
            },
            "Password": {
                input: "",
                error: "This field can not be empty"
            }
        }
    }
]