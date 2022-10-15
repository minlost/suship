import { useEffect, useState } from 'react';
import axios from 'axios'

const Reservation = () => {
    
    const [data, setData] = useState({
        date: '',
        time: '',
        number: '',
        tel: '',
        name: ''
    })



    const [notComplete, setNotComplete] = useState(true)

    const handleChaneg = (e) => {
        const {name, value} = e.target
        setData((prev) => {
          return {...prev, [name]: value}
        })
      }


      const printIt = async  () => {
        try {
            await axios.post('http://localhost:8000/senddata', {data}).then(setNotComplete(false))
        } catch (err) {
            console.log(err)
    }
 
}



    return (
        <>
        {notComplete && 
                <div className='container-middle'>
            <div className='form-container'>
            
            <h1>Rezervace stolu</h1>
            <label>Date</label>
            <input 
                type="date"
                className="form-control"
                name="date"
                onChange={handleChaneg}
                />
                <label>Hodina</label>
            <input 
                type="time"
                className="form-control"
                name="time"
                onChange={handleChaneg}
                />
                <label>Počet osob</label>
            <input 
                type="number"
                className="form-control"
                name="number"
                onChange={handleChaneg}
                />
            <label>Tel číslo</label>
            <input 
                type="text"
                className="form-control"
                name="tel"
                onChange={handleChaneg}
                />
            <label>Jméno</label>
            <input 
                type="text"
                className="form-control"
                name="name"
                onChange={handleChaneg}
                />
                <button className='button-res' onClick={printIt}>REZERVUJ</button>
        </div> </div>}

        {!notComplete && 
        <div className='container-middle'>
        <div className='form-container-done'>
            <h1>DĚKUJEME ZA REZERVACI</h1>
            <h2>Potvrzení vám příjde na tel. číslo {data.tel}</h2>
        </div> </div>}
        </>
    );
}

export default Reservation;
