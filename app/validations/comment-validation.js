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
    id: {
        taskId: {
            exists: {
                errorMessage:"Task id is is required"
            },
            notEmpty:{
                errorMessage: "Task id cannot be empty"
            }
        },
        userId: {
            exists: {
                errorMessage:"User id is is required"
            },
            notEmpty:{
                errorMessage: "User id cannot be empty"
            }
        },
    }
}

module.exports ={commentValidation}