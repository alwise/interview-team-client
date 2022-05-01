import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthTitle, LogoTitle, TextButton } from '../Components'
import { MyRoute } from '../Helpers'

export default function Page404() {
    const navigate = useNavigate()
  return (
    <div className='p-md-3'>

        <Card className="text-justify col-xs-12 col-sm-12 col-md-4" >
            <Card.Title className='ms-1 mb-0'>
                <LogoTitle/>
            </Card.Title>
            <Card.Body className='ms-3 me-3 mt-0'>

            <div className='mb-3 mt-0' >
                <AuthTitle title={'Oops!! this page is not available'}/>
                    <i style={{ fontSize:14 }}>No Page Found Here <TextButton value={'GO HOME'} callBack={()=>MyRoute.to(navigate,MyRoute.home.route,{replace:true})} /></i> 
            </div>
            <div className='f0f'/>

            {/* {show && <AlertMessage success={data?.status} message={data?.message} callBack={()=>{}}  />} */}
        
            </Card.Body>
           
        </Card>

    </div>
  )
}
