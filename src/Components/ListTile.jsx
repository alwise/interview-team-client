import React,{useState} from "react";
import {  Image } from "react-bootstrap";
import { TextButton } from "./Buttons";
import AlertConfirm from './AlertConfirm';
import { AuthenticationService as Auth } from "../Services";
import { ResourceLocations } from "../Utilities";

export default function ListTile({uid, name, email, photoUrl, handleDelete,callback,isAdmin }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = () => setShowConfirm(true);

  const handleCloseConfirm = () => setShowConfirm(false);

  const isMe = () => (Auth.getCurrentUser()?.uid === uid);
  const canDelete = () => (isAdmin && !isMe());

  const pStyle = {
    width: "100%",
    fontWeight: 500,
    fontSize: 14,
    padding: 0,
    margin: 0,
    textAlign: 'left'
  };
  return (

      <tr>
        <td width={'60'}>
          {
            <Image
            className="m-2"
              roundedCircle
              fluid
              width={50}
              height={40}
              src={photoUrl || ResourceLocations?.imgPlaceHolder}
              placeholder={"img"}
            />
          }
        </td>
        <td>
          {
            <div className="text-start">
              <p style={{ ...pStyle }}>{isMe() ? 'You' : name}</p>
              <p style={{ ...pStyle,fontWeight:200,fontSize:12 }}>{email}</p>
              <i className="bi bi-dot me-3" style={{ color: "green",fontSize:9 }}>
            online
          </i>
          { canDelete() && <TextButton value="Remove" callBack={handleShowConfirm} />}
            </div>
          }
          {showConfirm && (
        <AlertConfirm
          title={"Delete"}
          message={`Delete ${name} permanently? `}
          onClose={()=>{
            callback();
            handleCloseConfirm();
          }}
          callback={handleDelete}
        />
      )}
        </td>
      </tr>

  );
}

