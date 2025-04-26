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
    const { title, dueDate  , description} = req.body;
    
    console.log("👀 createTask body:", req.body, "userId:", req.userId);
    const newTask = new Task({
        title,
        dueDate,
        description,
        completed:false, // Default value
        userId: req.userId // Associate task with the logged-in user
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
    console.log("👀 updateTask id:", id, "body:", req.body);
    const { title, dueDate, completed , description} = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, dueDate, completed , description },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
}

export const deleteTask = async (req, res) => { 
    const { id } = req.params;
    console.log("👀 deleteTask id:", id);
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
}




export const toggleCompleted = async (req, res) => {
    const { id } = req.params;
    console.log("👀 toggleCompleted id:", id);
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed; console.log("👀 Task completed status toggled:", task.completed);
        await task.save();
        
        res.status(200).json({message: "Task completed status toggled successfully", task });
    } catch (error) {
        console.error("🔥 Error toggling task completed status:", error);
        res.status(500).json({ message: "Error toggling task completed status", error: error.message });
    }
 }


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