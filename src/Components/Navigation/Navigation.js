import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange}) => {
    return (
        <div>
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('Signout')}>Sign out</p>
            </nav>
        </div>
    );
};

export default Navigation;