import 'react-image-upload/dist/index.css'
import React from 'react'
import S3 from 'react-aws-s3' //# sourceMappingURL=react-aws-s3.js.map
import ImageUploader from 'react-image-upload'
import {AuthenticationService as Auth} from '../Services'
import { AlertMessage } from '../Components'
import { useState } from 'react';
import { Card ,ProgressBar} from 'react-bootstrap';
import { Colors } from '../Utilities'
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function AuthUpdateUserPhoto() {

  const [msgData,setData] = useState()
  const [show,setShow] = useState(false)
  const [progress,setProgress] = useState(false)
  const config = {
    bucketName: 'teamsprofile',
    dirName: 'photos',
    region: 'eu-west-1',
    accessKeyId: Auth.getCurrentUser()?.accessWithWith,
    secretAccessKey: Auth.getCurrentUser()?.registeredWith,

  }

  const ReactS3Client = new S3(config);

  const  getImageFileObject = async (imageFile) => {
    setShow(false);
    if(!imageFile?.file) return 
    setProgress(true)
    ReactS3Client
    .uploadFile(imageFile.file, `${Auth.getCurrentUser()?.uid}.jpg`)
    .then(async (data) => {
      const currentUser = Auth.getCurrentUser();
      const updateInfo = {
        uid:currentUser?.uid,
        name:currentUser?.name,
        email:currentUser?.email,
        profilePhoto : data?.location
      }
     
      const result = await Auth.update({
      ...updateInfo,
    });
    if(result?.status === true ) Auth.setUserData({...currentUser,...updateInfo});
    setData(result)
    setShow(true)
    setProgress(false)
    setTimeout(()=>handleReload(),2000)
  }
    )
    .catch(err => {
      setProgress(false)
      setData({
        status:false,
        message:'Unable to complete request',
      })
      setShow(true)
    })
    
  }
  const runAfterImageDelete = (file) => {
    
  }

  const handleReload = () =>{
    // MyRoute.to(navigate,MyRoute.dashboard.subRoutes.editProfile.changePhotoRoute,{replace:true})
    window.location.reload()

  }

  return (
    <div >
        <Card className='' style={{ width:'fit-content',margin:'0 auto'}}>
        <ImageUploader
           onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
            style={{ height: 200, width: 200, borderColor: 'grey' }}
            deleteIcon={
              <i className="bi bi-x-lg m-2"></i>
            }
            uploadIcon={
              <i  className="bi bi-upload" style={{ fontWeight:700,fontSize:30 }}></i>
              
            }
          />
         {progress &&  <ProgressBar striped variant={Colors.primary} color={Colors.primary} animated now={100} label="uploading.." />}
        </Card>
            
         {show && <AlertMessage success={msgData?.status} message={msgData?.message} callBack={()=>setShow(false)} />}

    </div>
  )
}

/**
   * {
   *   Response: {
   *     bucket: "myBucket",
   *     key: "image/test-image.jpg",
   *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
   *   }
   * }
   */