import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';

export const TypeContext = createContext();

const UserProvider = ({children})=>{
    const [user , setUser] = useState(null);

    const login = (username, password)=>{
        console.log(username , password)
        if(username === 'user'  && password=== 'user123'){
            setUser({username, role:'enduser'});
            return <Link to='/enduser'></Link>
        }
        else if(username=== 'techSupport' && password==='tech123'){
           setUser({username,role:'techSupport'});
           return <Link to='/techsupport'></Link>
        }
        else if(username==='admin' && password==='admin123'){
            setUser({username,role:'admin'});
            return <Link to='/admin'></Link>
        }
        else{
            throw new Error('Invalid username or password');
            
        }
    };

    const logout = ()=>{
        setUser(null);
    };

    return (
        <TypeContext.Provider value={{user,login,logout}}>
            {children}
        </TypeContext.Provider>
    )
}


export default UserProvider;
