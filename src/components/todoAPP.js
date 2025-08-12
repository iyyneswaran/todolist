import { useState } from "react";
import styles from "./todo.module.css";

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        task: "",
        category: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.task || !formData.category) return;

        const newTask = {
            id: Date.now(),
            text: formData.task,
            category: formData.category,
            completed: false
        };

        setTasks((prev) => [...prev, newTask]);
        setFormData({ task: "", category: "" });
    }

    function toggleComplete(id) {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    }

    return (
        <div className={styles.appContainer}>
            <h1 className={styles.title}>Todo List App</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                    Task
                    <input className={styles.input} name="task" type="text" value={formData.task} onChange={handleChange} />
                </label>

                <label className={styles.formLabel}>
                    Category
                    <select className={styles.select} name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="Work">Work</option>
                        <option value="Hobby">Hobby</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </label>

                <input className={styles.btn} type="submit" value="Add Task" />
            </form>

            <div className={styles.tasksSection}>
                <h2 className={styles.subtitle}>All Tasks</h2>
                <ul className={styles.taskList}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
                            onClick={() => toggleComplete(task.id)}
                        >
                            {task.text}{" "}
                            <span className={styles.categoryTag}>({task.category})</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.statusSection}>
                <div>
                    <h3 className={styles.subtitle}>Completed</h3>
                    <ul className={styles.taskList}>
                        {tasks
                            .filter((t) => t.completed)
                            .map((t) => (
                                <li key={t.id} className={`${styles.taskItem} ${styles.completed}`}>
                                    {t.text}{" "}
                                    <span className={styles.categoryTag}>({t.category})</span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <h3 className={styles.subtitle}>Not Completed</h3>
                    <ul className={styles.taskList}>
                        {tasks
                            .filter((t) => !t.completed)
                            .map((t) => (
                                <li key={t.id} className={styles.taskItem}>
                                    {t.text}{" "}
                                    <span className={styles.categoryTag}>({t.category})</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;