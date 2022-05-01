/* eslint-disable import/no-anonymous-default-export */

export default {

    home:{
        title:'Home',
        route:'/',
        subRoutes:{
            login:{
                title:'Login',
                route:'/login'
            },
            signup:{
                title:'Register',
                route:'/register'
            },
            requestPassReset:{
                title:'Reset Password',
                route:'/request-password-reset'
            },
            resetPassword:{
                title:'Reset Password',
                route:'/reset-password'
            },
            acceptInvite:{
                title:'Invite acceptance',
                route:'/accept-invite',
            
            }
        },
        
    },
    dashboard:{
        title:'Dashboard',
        route:'/dashboard',
        subRoutes:{
             teams:{
                 title:'teams',
                 route:'/teams/:id',  
                 home:'/teams',  
            },
           
            editProfile:{
                 title:'Profile',
                 route:'/edit-profile',
                 changePhotoRoute:'/edit-profile-photo',
            }
        }
    },

    to:(navigator,path,props)=>navigator(path,{...props}),


}




