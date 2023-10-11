import React, {useState} from 'react'
import Profile from './Profile';
import App from '../App';
import { useAuth0 } from '@auth0/auth0-react'


const GuestButton = (props) =>{
    //const [guestInput, setGuestInput] = useState(true);
    //const { guestLogin,isAuthenticated } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const guestLogin = ()=>{
        props.check(false);
    }

    /*const GuestHandler = (event) =>{
        setGuestInput(true);
        
        
    }*/
    return(
        !isAuthenticated && (<button className='guest' onClick={guestLogin}>Play As Guest</button>)
        
        
    )
};
export default GuestButton;