import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";



const Login = ({setAuthToken}) => {


    const [data, setData] = useState({
       jmeno: '',
       heslo: '',
    })
    const [ cookies, setCookie, removeCookie] = useCookies(null)
    const navigate = useNavigate()


    const printIt = async () => {
        console.log("asdasd");
        try {
            const res =  await axios.post('http://localhost:8000/login', {data})
            console.log(res.data);
            const token = await res.data
                setCookie('AuthToken', token)
            

        } catch (err) {
            console.log(err)
    } finally {
        navigate('/list')
        window.location.reload()
    }
 
}

    const loacteIt = () => {
        navigate('/list')
        window.location.reload()
    }
    
    const handleChanege = (e) => {
        const {name, value} = e.target
        setData((prev) => {
          return {...prev, [name]: value}
        })
      }

    return (
        <div>
            <div className='container-middle'>
                <div className="form-container">
            <div className="form-container">
                <form className="form-container-form">
                    <label>Jmeno</label>
                    <input type="text" name="jmeno" onChange={handleChanege}/>
                    <label>Heslo</label>
                    <input type="password" name="heslo" onChange={handleChanege}  />
            
                </form>
                <button onClick={printIt}>LOGIN</button>
                </div>
                </div>
            
            </div>
            
        </div>
    );
}

export default Login;
