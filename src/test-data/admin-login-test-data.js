export const loginSuccessfullyTestData = [
    {
        email: "daych93@gmail.com",
        password: "12345678"
    }
]

export const loginFailedTestData = [
    {
        testCase: "Login with wrong Password",
        email: "daych93@gmail.com",
        password: "1234567"
    },
    {
        testCase: "Login with wrong Email",
        email: "daych@gmail.com",
        password: "12345678"
    }
]

export const validateLoginFormTestData = [
    {
        testCase: "Validate Login Form in case of empty Email and Password",
        inputEmail: "",
        errorEmail: "This field can not be empty",
        inputPassword: "",
        errorPassword: "This field can not be empty"
    },
    {
        testCase: "Validate Login Form in case of invalid Email and empty Password",
        inputEmail: "day@cao",
        errorEmail: "Invalid email",
        inputPassword: "",
        errorPassword: "This field can not be empty"
    }
]