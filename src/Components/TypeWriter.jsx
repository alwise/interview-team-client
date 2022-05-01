import Typewriter from 'typewriter-effect';



export  function Typiest() {
  return (
    <Typewriter
        options={{
        strings: ['Create Your Team','Collaborate With Team','Invite Team Members'],
        autoStart: true,
        loop: true,
            
        }}
        />
  )
}
