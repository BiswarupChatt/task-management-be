const yup = require('yup');

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
