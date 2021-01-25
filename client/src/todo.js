import { useState, useEffect } from "react";

export default function ToDoList({ hair_health }) {
    console.log(hair_health);
    const [todos, setTodos] = useState({
        "1st Week": [
            {
                text: "Moisture",
                isCompleted: false,
            },
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Reconstruction",
                isCompleted: false,
            },
        ],
        "2nd Week": [
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Reconstruction",
                isCompleted: false,
            },
        ],
        "3rd Week": [
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Reconstruction",
                isCompleted: false,
            },
        ],
        "4th Week": [
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Nutrition",
                isCompleted: false,
            },
            {
                text: "Reconstruction",
                isCompleted: false,
            },
        ],
    });

    // const addTodo = (text) => {
    //     const newTodos = [...todos, { text }];
    //     setTodos(newTodos);
    // };

    const completeTodo = (index, week) => {
        const newTodos = {...todos};
        newTodos[week][index].isCompleted = !newTodos[week][index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index, week) => {
        const newTodos = { ...todos };
        console.log(newTodos[week]);
        newTodos[week].splice(index, 1);
        setTodos(newTodos);
    };

    useEffect(() => {        
    }, [todos]);

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
                                    removeTodo={removeTodo}
                                />
                            ))}
                            {/* <TodoForm 
                                addTodo={addTodo} 
                            /> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Todo({ todo, index, week, completeTodo, removeTodo }) {
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
                <button onClick={() => removeTodo(index, week)}>X</button>
            </div>
        </div>
    );
}

// function TodoForm({ addTodo }) {
//     const [value, setValue] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!value) {
//             return;
//         } else {
//             addTodo(value);
//             setValue('');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type='text'
//                 className='input'
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//             />
//         </form>
//     );
// }
