import React from 'react';

function ViewItems(props) {
    let style = props.items.completed ? {
        color: "gray",
        textDecoration: "line-through",
        fontStyle: "italic"
    } : {
        color: "black"
    }

    const updateLocalStorage = (updatedTodos) => {
        localStorage.setItem("myTasks", JSON.stringify(updatedTodos));
    }
    const handleChange = (itemKey) => {
        let updatedTask = [];
        const myTasks = JSON.parse(localStorage.getItem('myTasks'));
        for (let i = 0; i < myTasks.length; i++) {
            if (itemKey === myTasks[i].id) {
                myTasks[i].completed = !myTasks[i].completed;
                updatedTask.push(myTasks[i])
            } else {
                updatedTask.push(myTasks[i])
            }
        }
        updateLocalStorage(updatedTask)
    }
    const handleDblClick = (event, itemKey) => {
        event.preventDefault();
        alert(`double clicked ${itemKey}`);
    }
    return (
        <div className="flex-row content-center	items-center">
            <input
                type="checkbox"
                checked={props.items.completed}
                onChange={() => handleChange(props.items.id)}
            />
            <span className="ml-1" style={style} onDoubleClick={(e) => handleDblClick(e, props.items.id)}>{props.items.taskItem}</span>
        </div>
    )
}
export default ViewItems