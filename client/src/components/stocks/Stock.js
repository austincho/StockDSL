import React from 'react'; 
import './Stock.css'
const Stock = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
    

    
        </tr>
    )
}
export default Stock; 
