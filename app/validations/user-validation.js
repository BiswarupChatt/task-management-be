const User = require('../models/user-model')

const passwordValidation = (value) => {
    const upperCaseRegex = /[A-Z]/
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    const numberRegex = /[0-9]/
    return upperCaseRegex.test(value) && specialCharRegex.test(value) && numberRegex.test(value)
}

const userRegisterValidation = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'First Name is required'
        },
        notEmpty: {
            errorMessage: 'First Name cannot be empty'
        },
        trim: true
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'Last Name is required'
        },
        notEmpty: {
            errorMessage: 'Last Name cannot be empty'
        },
        trim: true
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be in a valid format'
        },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value })
                if (user) {
                    throw new Error('Email already taken')
                } else {
                    return true
                }
            }
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'Password is required'
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        isLength: {
            options: {
                min: 8, max: 128
            },
            errorMessage: 'Password should be between 8-128 character'
        },
        custom: {
            options: (value) => {
                if (!passwordValidation(value)) {
                    throw new Error('Password must contain at least one uppercase letter and one special character and one number')
                } else {
                    return true
                }
            }
        },
        trim: true
    },
    role: {
        in: ['body'],
        exists: {
            errorMessage: 'Role is required'
        },
        notEmpty: {
            errorMessage: 'Role cannot be empty'
        },
        isIn: {
            options: [['TeamLead', 'Employee']],
            errorMessage: 'Role should be HR, TeamLead or Employee'
        }
    }
}

const userLoginValidations = {
    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Email should be in a valid format'
        },
        normalizeEmail: true,
        trim: true
    },
    password: {
        exists: {
            errorMessage: 'Password is required'
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        custom: {
            options: (value) => {
                if (!passwordValidation(value)) {
                    throw new Error('Password must contain at least one uppercase letter and one special character and one number')
                } else {
                    return true
                }
            }
        },
        trim: true
    }
}

const userUpdateValidations = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'First Name is required'
        },
        notEmpty: {
            errorMessage: 'First Name cannot be empty'
        },
        trim: true
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'Last Name is required'
        },
        notEmpty: {
            errorMessage: 'Last Name cannot be empty'
        },
        trim: true
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Email should be in a valid format'
        },
        trim: true,
        normalizeEmail: true
    }
}

module.exports = { userRegisterValidation, userLoginValidations, userUpdateValidations }
