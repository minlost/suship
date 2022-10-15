import React from 'react'
import { Link } from "react-router-dom";

const Customers = ({excrecise, handleDelete, navigateEdit}) =>{
    return (
      <tr>
         <th>{excrecise.name}</th>
          <th>{excrecise.date}</th>
          <th>{excrecise.time}</th>
          <th>{excrecise.number}</th>
          <th>{excrecise.tel}</th>
          <th>{excrecise._id}</th>
          <button onClick={() => handleDelete(excrecise._id)}>Delete</button>
          <Link to={`/edit/`+excrecise._id}>
           <button>Edit</button>
          </Link>

          
          <td>
          </td>
      </tr>
  )
  }
export default Customers