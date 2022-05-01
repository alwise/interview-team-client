import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import {Colors} from '../Utilities'
export function TextButton({value,callBack,style,icon}) {
  return (
    
      <Button size="sm" variant='link' color='light' style={{
           color:Colors.primary,padding:0,textDecoration:'none',...style}} onClick={callBack} >{icon || ''} {value}</Button>
  )
}


export function SubmitButton({value,callBack,type,style,className }) {
    const [isLoading, setLoading] = useState(false);

    const handleClick =  async() => {
        setLoading(true);callBack && await callBack(); setLoading(false)};
  
    return (
      <Button
      type={type || 'submit'}
       style={{
           backgroundColor:Colors.primary,
           color:'#fff',
           width:'100%',
           fontWeight:'bolder',
           
           ...style
       }}
       size="md"
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
        className={className}
      >
        {isLoading ? 'Please wait...' : `${value || 'Submit'}`}
      </Button>
    );
  }

