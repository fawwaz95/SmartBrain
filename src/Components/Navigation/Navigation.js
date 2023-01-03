import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange}) => {
    return (
        <div>
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p className='f3 link dim white db pointer tr pa4 i' onClick={() => onRouteChange('Signout')}>Sign out</p>
            </nav>
        </div>
    );
};

export default Navigation;