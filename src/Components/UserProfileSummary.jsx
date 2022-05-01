import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { AuthenticationService as Auth } from '../Services'
import { useEffect } from 'react';
import { TextButton} from './Buttons';
import { MyRoute } from '../Helpers';
import { useNavigate } from 'react-router-dom';
const imgPlaceHolder = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&w=1000&q=80';
export default function UserProfileSummary() {
    const navigate = useNavigate();
    const signOut = () =>{
        Auth.logout()
        MyRoute.to(navigate,MyRoute.home.route,{replace:true})
    }

    useEffect(()=>{
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
            <Image roundedCircle src={Auth?.getCurrentUser()?.profilePhoto || imgPlaceHolder}  width={90} height={92} />
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
