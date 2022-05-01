/* eslint-disable import/no-anonymous-default-export */
import {requests as API} from './api_request'
import AuthenticationService from './AuthenticationService';
export default {

    create: async(data) =>{
        const result = await (await API.post(API.baseUrl.teams(API.endpoint.create),data)).data;
        return result;
    },

    update: async(data) =>{
        const result = await (await API.patch(API.baseUrl.team(API.endpoint.update),data)).data;
        return result;
    },

    getMyTeams: async() =>{
        const result = await (await API.get(API.baseUrl.teamMem(API.endpoint.base),{userId:AuthenticationService.getCurrentUser()?.uid})).data;
        return result;
    },

    delete: async(data) =>{
        const result = await (await API.delete(API.baseUrl.teams(API.endpoint.delete),data)).data;
        return result;
    },
  
    // Team Members
    addTeamOwner: async(data) =>{
        const result = await (await API.post(API.baseUrl.teamMem(API.endpoint.create),data)).data;
        return result;
    },

     /**
     * 
     * 
     * @returns List of members for team.
     */
      getTeamMembers: async(teamId) =>{
        const getAllTeamMemberId = await (await API.get(API.baseUrl.teamMem(API.endpoint.base),{teamId})).data;
         if(getAllTeamMemberId?.status === false) return getAllTeamMemberId;
        
         if(getAllTeamMemberId?.data?.length < 1) return getAllTeamMemberId
         const uidList = [];
         const teamMemberData  =    getAllTeamMemberId?.data || [];
         teamMemberData.forEach((teamMember)=> { uidList.push(teamMember?.userId) })
         // fetch members data for the provided team id
        const result = await (await API.get(API.baseUrl.users(API.endpoint.forTeam),{id:uidList})).data;
        return result;
    },

    deleteTeamMember: async(data) =>{
        const result = await (await API.delete(API.baseUrl.teamMem(API.endpoint.delete),data)).data;
        return result;
    },

    // invite team members
    inviteMember: async(data) =>{
        const result = await (await API.post(API.baseUrl.invites(API.endpoint.create),data)).data;
        return result;
    },

    acceptInvite: async(data) =>{
        const result = await (await API.get(API.baseUrl.invites(API.endpoint.accept),data)).data;
        return result;
    },

    validateInvite: async(data) =>{
        const result = await (await API.get(API.baseUrl.invites(API.endpoint.validate),data)).data;
        return result;
    },

    getTeamInvites: async(data) =>{
        const result = await (await API.get(API.baseUrl.teamMem(API.endpoint.base),data)).data;
        return result;
    },
    
   

}

