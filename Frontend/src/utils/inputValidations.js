// This file defines validation rules for user authentication fields, 
// including username, email, password, confirm password, and verification code.
export const username_validation = {
    name: 'username',
    label: 'Username',
    type: 'text',
    id: 'username',
    placeholder: 'Username',
    validation: {
        required: {
            value: true,
            message: 'Username is required',
        },
        maxLength: {
            value: 20,
            message: 'max 20 characters',
        },
        pattern: {
            value: /^[a-zA-Z0-9]*$/,
            message: 'Username must contain only letters and numbers',
        },
    },
}

export const email_validation = {
    name: 'email',
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Email Address',
    validation: {
        required: {
            value: true,
            message: 'Email is required',
        },
        pattern: {
            value:
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Email must be valid',
        },
    },
}

export const password_validation = {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    validation: {
        required: {
            value: true,
            message: 'Password is required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message: 'Password must contain upper, lower case letters and numbers',
        },
        validate: (value, formValues) => {
            return !formValues.confirmPassword || value === formValues.confirmPassword || 'Passwords do not match'
        }
    },
}

export const confirm_password_validation = {
    name: 'cPassword',
    label: 'Confirm Password',
    type: 'password',
    id: 'c-password',
    placeholder: 'Confirm password',
    validation: {
        required: {
            value: true,
            message: "Confirm Password is required",
        },
        validate: (value, formValues) => {
            return value === formValues.password || 'Passwords do not match'
        },
        hint: 'Please enter your password again'   
    }
}

export const verification_code_validation = {
    name: 'verificationCode',
    label: 'Verification Code',
    type: 'text',
    id: 'verificationCode',
    placeholder: 'Enter verification code',
    validation: {
        required: {
            value: true,
            message: 'Verification code is required',
        },
        minLength: {
            value: 6,
            message: 'Verification code should be 6 characters',
        },
        maxLength: {
            value: 6,
            message: 'Verification code should be 6 characters',
        },
    },
}
