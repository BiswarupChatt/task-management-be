const commentValidation = {
    content: {
        in: ["body"],
        exists: {
            errorMessage: "Content is required"
        },
        notEmpty: {
            errorMessage: "Content cannot be empty"
        },
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: "Content should be between 1 to 100 characters long"
        },
        trim: true
    },
    'identifier.taskId': {
        exists: {
            errorMessage: "Task Id is  required"
        },
        notEmpty: {
            errorMessage: "Task Id cannot be empty"
        },
        in: ["param"]
    },
    'identifier.userId': {
        exists: {
            errorMessage: "User Id is  required"
        },
        notEmpty: {
            errorMessage: "User Id cannot be empty"
        },
        in: ["header"]
    },

}

const commentEditValidation = {
    content: {
        in: ["body"],
        exists: {
            errorMessage: "Content is required"
        },
        notEmpty: {
            errorMessage: "Content cannot be empty"
        },
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: "Content should be between 1 to 100 characters long"
        },
        trim: true
    }
}

module.exports = { commentValidation , commentEditValidation }