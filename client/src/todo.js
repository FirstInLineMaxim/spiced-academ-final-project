//todo
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ToDoList({todo}) {
    const [todos, setTodos] = useState(todo);

    const completeTodo = (index, week) => {
        const newTodos = { ...todos };
        newTodos[week][index].isCompleted = !newTodos[week][index].isCompleted;
        setTodos(newTodos);
        localStorage.setItem("todo-list", JSON.stringify(todos));
    };

    useEffect(() => {
        const localStorageList = localStorage.getItem("todo-list");
        // app.get('')
        if (!localStorageList) {
            return null;
        } else {
            setTodos(JSON.parse(localStorageList));
        }
    }, []);

    // const clearTodo = () => {
    //     localStorage.clear();
    //     console.log(todos);
    //     todos.map(week => (week.map(item => ({...item, isCompleted: false}))));
    //     //
    // };

    return (
        <>
            <h2 className="green">Hair Care Routine</h2>
            <div className="todo-list">
                {Object.keys(todos || {}).map((week, idx) => {
                    return (
                        <div className="todo-week" key={idx}>
                            <p className='week'>{week}</p>
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
            {/* <button onClick={clearTodo}>Clear all</button> */}
            <button>
                <Link to="/survey">New schedule </Link>{" "}
            </button>
        </>
    );
}

function Todo({ todo, index, week, completeTodo }) {
    return (
        <div className="todo">
            <button
                className={`btn-${index}`}
                onClick={() => completeTodo(index, week)}
            >
                {todo.isCompleted ? "Done" : "To do"}
            </button>
            <p
                style={{
                    textDecoration: todo.isCompleted ? "line-through" : "",
                }}
            >
                {todo.text}
            </p>
        </div>
    );
}