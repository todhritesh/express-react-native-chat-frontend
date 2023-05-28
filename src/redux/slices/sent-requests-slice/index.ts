import { createSlice , createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import getAuthToken from "../../../services/getAuthToken";
import User from "../../../types/auth";

interface FriendState{
    data : User[];
    loading:boolean;
    initialLoading:boolean;
    error:any | null;
}

const initialState: FriendState = {
    data: [],
    loading: false,
    initialLoading: false,
    error: null,
  };

export const fetchSentRequests = createAsyncThunk<User[] , void , {rejectValue:string}>(
    'friends/fetchSentRequests',
    async (_ , {rejectWithValue}) => {
        try {
            const token = await getAuthToken()
            console.log(token,'token')
            if(token){
                const res = await api.get('/friends/sent-requests',{
                    headers:{
                        Authorization:token
                    }
                })
                console.log(res.data)
                
                const data = res.data.sentRequests.map(item=>({...item,defaultStatus:true}))
                return data as User[]
            }
            return rejectWithValue('Something went wrong');
        }catch(err) {
            console.log(err,"in friend slice")
            return rejectWithValue(err?.message);
        }
    }
)

const sentRequestSlice  = createSlice({
    name:'sentRequest' ,
    initialState ,
    reducers:{
        changeDefaultStatus : (state , action: PayloadAction<string>) => {
            state.data = state.data.map(item=>{
                if(item._id===action.payload){
                    return {
                        ...item,
                        defaultStatus:false
                    }
                }
                return item
            })
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchSentRequests.pending , state =>{
                state.loading = true
            })
            .addCase(fetchSentRequests.fulfilled , (state , action : PayloadAction<User[]>)=>{
                state.loading = false
                state.data = action.payload
                if(!state.initialLoading){
                    state.initialLoading = true
                }
            })
            .addCase(fetchSentRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.initialLoading = true
              });
    }

})

export default sentRequestSlice.reducer;
export const {changeDefaultStatus} = sentRequestSlice.actions