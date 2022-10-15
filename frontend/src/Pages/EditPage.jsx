import { useEffect, useState } from 'react';
import axios from 'axios'
import {Routes, Route, useNavigate, Link, useParams, useLocation} from 'react-router-dom';


const EditPage = () => {
    

    const [data, setData] = useState({
        date: '',
        time: '',
        number: '',
        tel: '',
        name: '',
        id: ''
    })

    const navigate = useNavigate()


    useEffect(() =>{
        getData()
    },[])

    const handleChaneg = (e) => {
        const {name, value} = e.target
        setData((prev) => {
          return {...prev, [name]: value}
        })
      }
      const handleSend = async () => {

        try {
            const response = await axios.put('http://localhost:8000/edit/'+data.id, {data})
            console.log('submitted')
            console.log(response)
            const success = response.status === 200
            navigate('/list')
        } catch (err) {
            console.log(err)

        }
    }

    const getData = async () => {
        const path = window.location.pathname.split("/").slice(-1)[0] 
        const res = await axios.get(`http://localhost:8000/getdata/${path}`)
        const jsonData = await res.data[0]

        const { date, time, number, tel, name, _id } = jsonData
       
        setData({
            date: date,
            time: time,
            number: number,
            tel: tel,
            name: name,
            id: _id,
        })
    }


    return (
        <div className='container-middle'>
        <div className='form-container'>
            
            <h1>Editace </h1>
            <label>Date</label>
            
            <input 
                type="date"
                className="form-control"
                name="date"
                value={data.date}
                onChange={handleChaneg}
                />
                <label>Hodina</label>
            <input 
                type="time"
                className="form-control"
                name="time"
                value={data.time}
                onChange={handleChaneg}
                />
                <label>Počet osob</label>
            <input 
                type="number"
                className="form-control"
                name="number"
                value={data.number}
                onChange={handleChaneg}
                />
                <label>Tel. číslo</label>
            <input 
                type="text"
                className="form-control"
                name="tel"
                value={data.tel}
                onChange={handleChaneg}
                />
                <label>Jméno    </label>
            <input 
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChaneg}
               
                />
                <label>Id</label>
            <input 
                type="text"
                className="form-control"
                name="id"
                value={data.id}
                onChange={handleChaneg}
                disabled="disabled"
                />
                <button onClick={handleSend}>PRINT</button>
                </div>
        </div>
    );
}

export default EditPage;
