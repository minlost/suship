import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Customers from '../components/Customers'
import {Routes, Route, useNavigate} from 'react-router-dom';



const List = () => {

    const [data, setData] = useState([])


    useEffect(() =>{
  
        axios.get('http://localhost:8000/getdata')
          .then(response => {
            setData(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          }) 
      },[])

  
    // const tryTofetch = () => {
    //   setData([{2:2},{1:1}])
    //   axios.get('http://localhost:8000/getdata')
    //   .then(response => {
    //     setData(response.data)
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }) 
    // }


      const exerciseList = () =>{
        return data.map(currentexercise => {
          return  <Customers excrecise={currentexercise} key={currentexercise._id} handleDelete={handleDelete}/> ;
        })
      }

      const handleDelete = async (id) => {
        const res = await axios.delete('http://localhost:8000/deletedata/'+id)
        console.log('Item successfully deleted.')
        setData(
          data.filter(el => el._id !== id))
    }
      
    return (
        <div>
        <div className='record-container'>
        <table className="styled-table">
          <thead >
            <tr>
              <th>Jméno</th>
              <th>Datum</th>
              <th>Čas</th>
              <th>Číslo</th>
              <th>Telefon</th>
              <th>ID</th>
         
            </tr>
          </thead>
          <tbody>
        
          {exerciseList()}  
          </tbody>
        </table>
            </div>
    
        </div>
    );
}

export default List;
