import React from 'react';

function ViewItems(props) {
    const style = props.items.completed ? {
        color: "gray",
        textDecoration: "line-through",
        fontStyle: "italic",
        cursor: "pointer"
    } : {
        color: "black",
        cursor: "pointer",
    }

    const myTasks = JSON.parse(localStorage.getItem('myTasks'));

    const updateLocalStorage = (updatedTodos) => {
        localStorage.setItem("myTasks", JSON.stringify(updatedTodos));
    }

    const handleChange = (itemKey) => {
        let updatedTask = [];
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
        let tempArray = [...myTasks];
        const ids = myTasks.map(item => item.id)
        const indexToRemove = ids.indexOf(itemKey)
        tempArray.splice(indexToRemove, 1);
        updateLocalStorage(tempArray);
    }
    return (
        <div className="flex-row content-center	items-center py-1">
            <input
                type="checkbox"
                checked={props.items.completed}
                onChange={() => handleChange(props.items.id)}
            />
            <span className="ml-1" title="Double click to remove" style={style} onDoubleClick={(e) => handleDblClick(e, props.items.id)}>{props.items.taskItem}</span>
        </div>
    )
}
export default ViewItems