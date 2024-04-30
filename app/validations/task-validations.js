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
    custom: {
      options: async (value) => {
        const existingTask = await Task.findOne({ title: value });
        if (existingTask) {
          throw new Error("Title must be unique");
        }
        return true;
      },
    },
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
    optional: true,
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
};

module.exports = { taskValidations };
