

import React from 'react'
import {Card} from 'react-bootstrap'
import { Colors } from '../Utilities'


export  function LogoTitle({style,cardStyle}) {

  const titleStyle = {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
    margin: '0',
    padding: '0',
    ...style
  }

  return (
     <Card border='light' style={{ width:'fit-content',...cardStyle  }}  >
        <p style={titleStyle}>JAM</p>
        <p style={titleStyle}>TEAMS</p>
     </Card>
  )
}


export function AuthTitle({title,style}){

  return (
      <h4 style={{ fontWeight:'bolder',margin:0,padding:0,...style }} >{title || 'Authenticate'}</h4>
  );

}
