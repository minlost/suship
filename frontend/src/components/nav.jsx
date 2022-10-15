import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'


const Nav = ({authToken}) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const navigate = useNavigate()

    const logOut = () => {
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
        window.location.reload()

    }

    return (
        <div >
          <header>
            <nav>
                <ul>
                <Link to={"/"}> <li>Domů</li></Link>
                <Link to={"/reservation"}><li>Reservation</li></Link>
              
                {!authToken &&<Link to={'/login'}> <li>Login</li></Link>}
                {authToken &&  <Link to={'/login'}> <li className='nav-admin'>Admin</li></Link>}
                </ul>
                
            </nav>
            {authToken && <span onClick={logOut} className='container-x'>❌</span>}
       
         </header>
        </div>
    );
}

export default Nav;
