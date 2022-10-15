import React from 'react';
import sushiLogo from '../img/sushi.png'

const Home = () => {
    return (
        <>
        <div className='main-logo'>
            <div className='logo-container'>
            <h1>Sushi</h1>   
            <h2>by Johan</h2>
            <img src={sushiLogo} alt="sushiLogo" />
            </div>
     
            
            
        </div>
        </>
    );
}

export default Home;
