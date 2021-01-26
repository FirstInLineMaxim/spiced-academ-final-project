import { useState, useEffect } from "react";

export default function ToDoList({ todo }) {
    const [todos, setTodos] = useState(todo);

    const completeTodo = (index, week) => {
        const newTodos = { ...todos };
        newTodos[week][index].isCompleted = !newTodos[week][index].isCompleted;
        setTodos(newTodos);
        localStorage.setItem("todo-list", JSON.stringify(todos));
    };

    useEffect(() => {
        const localStorageList = localStorage.getItem("todo-list");
        if (!localStorageList) {
            return null;
        } else {
            setTodos(JSON.parse(localStorageList));
        }
    }, []);

    const clearTodo = () => {
        localStorage.clear();
    };

    return (
        <div className="todo-container">
            <h1>TODO</h1>
            <div className="todo-list">
                {Object.keys(todos).map((week, idx) => {
                    return (
                        <div key={idx}>
                            <p>{week}</p>
                            {todos[week].map((todo, index) => (
                                <Todo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    week={week}
                                    completeTodo={completeTodo}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
            <button onClick={clearTodo}>Clear all</button>
        </div>
    );
}

function Todo({ todo, index, week, completeTodo }) {
    return (
        <div
            className="todo"
            style={{
                textDecoration: todo.isCompleted ? "line-through" : "",
            }}
        >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index, week)}>
                    Complete
                </button>
            </div>
        </div>
    );
}

