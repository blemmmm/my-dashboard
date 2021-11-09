import React from 'react';

function ViewItems(props) {
    const handleChange = (itemKey) => {
        // const items = props.items.map(todo => {
        //     if(todo.item === item) {
        //         todo.completed = !todo.completed
        //     }
        // })
        console.log(itemKey);
    }

    return(
        <div>
            <input 
                type="checkbox" 
                checked={props.items.completed} 
                onChange={() => handleChange(props.items.id)}
            />
            <span className="ml-1">{props.items.taskItem}</span>
        </div>
    )
}
export default ViewItems