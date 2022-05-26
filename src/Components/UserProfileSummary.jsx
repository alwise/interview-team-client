import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { AuthenticationService as Auth } from '../Services'
import { useEffect } from 'react';
import { TextButton} from './Buttons';
import { MyRoute } from '../Helpers';
import { useNavigate } from 'react-router-dom';
import { ResourceLocations } from '../Utilities';
import { useState } from 'react';

export default function UserProfileSummary() {
    const [image,setImage] = useState();
    const navigate = useNavigate();
    const signOut = () =>{
        Auth.logout()
        MyRoute.to(navigate,MyRoute.home.route,{replace:true})
    }

    useEffect(()=>{
        setImage(Auth?.getCurrentUser()?.profilePhoto)
        // console.log(Auth.getCurrentUser());
    },[])

    let pStyle = {
        padding:0,
        margin:0,
        fontWeight: 600,
        fontSize: 12
    }

  return (
     <Card className='col text-center'>
            <Card.Body>
            <Image  width={100} height={100} roundedCircle rounded src={image || ResourceLocations?.imgPlaceHolder}  />
                <p><TextButton value={'Edit Profile'}
                callBack={()=>MyRoute.to(navigate,MyRoute.dashboard.subRoutes.editProfile.route,{replace:true})}
                 style={{margin:3}}/> | <TextButton value={'Change photo'}
                callBack={()=>MyRoute.to(navigate,MyRoute.dashboard.subRoutes.editProfile.changePhotoRoute,{replace:true})}
                 style={{margin:3}}/></p>
                <p style={pStyle}><i className="bi bi-person-circle me-2"></i>{Auth.getCurrentUser()?.name || 'n/a'}</p>
                <p style={pStyle}><i className="bi bi-envelope-fill me-2"></i>{Auth.getCurrentUser()?.email || 'n/a'}</p>
                <TextButton value={'Sign out'} callBack={signOut} />
            </Card.Body>
     </Card>
  )
}
