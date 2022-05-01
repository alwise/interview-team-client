import {  Modal } from 'react-bootstrap';
import { SubmitButton } from './Buttons';
import { LogoTitle } from './MyTitle';

export default function AlertConfirm({title,variant,message,onClose ,callback}) {

  
    return (
      <>
        <Modal show={true} size="sm" variant={variant || "info"}>
        <Modal.Header closeButton >
            <LogoTitle style={{fontSize: 9}} cardStyle={{marginRight: 5}} />
            <Modal.Title  style={{fontSize:14}}>{title}</Modal.Title>
         
          </Modal.Header>
          <Modal.Body>
                {message}
          </Modal.Body>
         
          <Modal.Footer className="text-center" >
            <SubmitButton style={{ width: '40%',fontSize:12,fontWeight: 300}} value={'Cancel'} callBack={onClose} />
             
            <SubmitButton style={{ width: '40%',fontSize:12,fontWeight: 300}} value={'Yes'}  callBack={callback} />
          </Modal.Footer>
        </Modal>

      </>
    );
  }
  