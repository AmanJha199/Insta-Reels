import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from '../Context/AuthProvider'

function PrivateRoute({component:Component, ...rest}) {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            //If currentUser is logged-in jb redirect krdo feed pr and 
            //if not logged-in then redirect to login page
            return currentUser?<Component {...props} />:<Redirect to='/login'/>
        }}/>
    )
}

export default PrivateRoute
