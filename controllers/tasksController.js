import Task from "../models/tasksModel.js";


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });

        if (!tasks) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
 }

export const createTask = async (req, res) => { 
    const { title, dueDate } = req.body;
    const newTask = new Task({
        title,
        dueDate,
        userId
: req.userId, // Assuming you have userId in req object from middleware
        completed: false,
    })
    try {
        await newTask.save();
        res.status(201).json({ message: "Task created successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
    
}

export const updateTask = async (req, res) => { 
    const { id } = req.params;
    const { title, dueDate, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, dueDate, completed },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
}

export const deleteTask = async (req, res) => { 
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
}

export const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // Completed can be true or false

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("🔥 Error updating task status:", error);
        res.status(500).json({ message: "Error updating task status", error: error.message });
    }
};


export const getTaskById = async (req, res) => { 
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
        
    }
}