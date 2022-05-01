import {createStore,action,thunk} from 'easy-peasy';
import {TeamServices} from '.'
const store = createStore({
    isLoading:false,
    teams:[],
    teamMembers:[] ,
    setMembers: action((state, payload) => {
        state.isLoading = false;
        state.teamMembers = payload;
    }),

    getTeamMembers: thunk( async (action,payload)=>{
        ///get team
        action.setMembers(payload?.data);
       
    }),
    setTeams: action((state, payload) => {
        state.isLoading = false;
        state.teams = payload || [];
    }),

    getTeams: thunk(async (action,payload)=>{
        ///get team
        const data = await TeamServices.getMyTeams();
        if(data?.status === true)
            action.setTeams(data?.data);
       
    })

});

export default store;