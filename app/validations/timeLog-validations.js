// const yup = require('yup');
// import { object } from 'yup';
// const timeLogValidation = yup.object({
//     taskId: yup
//         .string()
//         .required('Task ID is required.'),


<<<<<<< HEAD
    
//     timeSpent: yup
//         .number()
//         .required('Time spent is required.')
//         .positive('Time spent must be a positive number.')
//         .integer('Time spent must be an integer.')
// });

// module.exports = timeLogValidation;

const TimeLog = require("../models/timeLog-model")

const timeLogValidations = {
    taskId: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
    notEmpty:{
        errorMessage: 'User ID cannot be empty'
        }
        
    },
    // userId: {
    //     in: ['body'],
    //     exists:{
    //         errorMessage:"userId is required"
    //     },
    // notEmpty:{
    //     errorMessage: 'User ID cannot be empty'
    //     }
        
    // },
    timeSpent: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
        notEmpty:{
            errorMessage: 'User ID cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Time spent must be a numeric value'
        },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    throw new Error("Time spent must be greater than zero");
                }
                return true;
            },
            errorMessage: 'Time spent must be greater than zero'
        }
    },
    
        
};

module.exports = timeLogValidations;

=======
const timeLogValidation = yup.object({
    taskId: yup
        .string()
        .required('Task ID is required.'),

    timeSpent: yup
        .number()
        .required('Time spent is required.')
        .positive('Time spent must be a positive number.')
        .integer('Time spent must be an integer.')
});

module.exports = timeLogValidation;
>>>>>>> 98292a91d351d7ffa691aaee691dd46986b8affa
