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




const taskUpdateValidations = {
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'Title is required'
        },
        notEmpty: {
            errorMessage: 'Title cannot be empty'
        },
        trim: true,
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: 'Title should be between 1 and 100 characters long'
        }
    },
    description: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { max: 500 },
            errorMessage: 'Description cannot be more than 500 characters long'
        },
        trim: true
    },
    priority: {
        in: ['body'],
        exists: {
            errorMessage: 'Priority is required'
        },
        notEmpty: {
            errorMessage: 'Priority cannot be empty'
        },
        isIn: {
            options: [['Low', 'Medium', 'High']],
            errorMessage: 'Priority must be one of: Low, Medium, High'
        }
    },
    status: {
        in: ['body'],
        exists: {
            errorMessage: 'Status is required'
        },
        notEmpty: {
            errorMessage: 'Status cannot be empty'
        },
        isIn: {
            options: [['Pending', 'In Progress', 'Completed']],
            errorMessage: 'Status must be one of: Pending, In Progress, Completed'
        }
    },
    dueDate: {
        in: ['body'],
        exists: {
            errorMessage: 'Due Date is required'
        },
        notEmpty: {
            errorMessage: 'Due Date cannot be empty'
        },
        // isISO8601: {
        //     errorMessage: 'Due Date must be a valid date'
        // },
        toDate: true  // Converts to Date object after validation
    },
    assignedUserId: {
        in: ['body'],
        exists: {
            errorMessage: 'Assigned User ID is required'
        },
        notEmpty: {
            errorMessage: 'Assigned User ID cannot be empty'
        },
        isMongoId: {
            errorMessage: 'Assigned User ID must be a valid MongoDB ObjectId'
        }
    },
    userId: {
        in: ['body'],
        exists: {
            errorMessage: 'User ID is required'
        },
        notEmpty: {
            errorMessage: 'User ID cannot be empty'
        },
        isMongoId: {
            errorMessage: 'User ID must be a valid MongoDB ObjectId'
        }
    }
};




module.exports = { taskValidations,taskUpdateValidations };
