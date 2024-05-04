const Task = require("../models/task-model");

const taskValidations = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "Title is required",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
    trim: true,
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Title should be between 1 and 100 characters long'
    }
  },
  description: {
    in: ["body"],
    exists: {
      errorMessage: "Description is required",
    },
    notEmpty: {
      errorMessage: "Description cannot be empty",
    },
    trim: true,
    isLength: {
      options: { min: 1, max: 600 },
      errorMessage: 'Title should be between 1 and 100 characters long'
    }
  },
  priority: {
    in: ["body"],
    exists: {
      errorMessage: "Priority is required",
    },
    notEmpty: {
      errorMessage: "Priority cannot be empty",
    },
    isIn: {
      options: [["Low", "Medium", "High"]],
      errorMessage: "Priority must be Low, Medium, or High",
    },
  },
  status: {
    in: ["body"],
    exists: {
      errorMessage: "Status is required",
    },
    notEmpty: {
      errorMessage: "Status cannot be empty",
    },
    isIn: {
      options: [["Pending", "In Progress", "Completed"]],
      errorMessage: "Status must be Pending, In Progress, or Completed",
    },
  },
  dueDate: {
    in: ["body"],
    exists: {
      errorMessage: "Due Date is required",
    },
    notEmpty: {
      errorMessage: "Due Date cannot be empty",
    },
    isDate: {
      errorMessage: "Due Date must be a valid date",
    },
    custom: {
      options: (value) => {
        if (new Date(value) < new Date()) {
          throw new Error("Due Date must be in the future");
        }
        return true;
      },
    },
  },
  assignedUserId: {
    in: ["body"],
    exists: {
      errorMessage: "Assigned User Id is required",
    },
    notEmpty: {
      errorMessage: "Assigned User Id cannot be empty",
    },
  }
};



  module.exports = { taskValidations}
