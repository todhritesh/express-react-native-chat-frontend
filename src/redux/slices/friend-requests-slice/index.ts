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

export const fetchFriendRequests = createAsyncThunk<User[] , void , {rejectValue:string}>(
    'friends/fetchFriendRequests',
    async (_ , {rejectWithValue}) => {
        try {
            const token = await getAuthToken()
            console.log(token,'token')
            if(token){
                const res = await api.get('/friends/friend-requests',{
                    headers:{
                        Authorization:token
                    }
                })
                const data = res.data.friendRequests.map(item=>({...item,defaultStatus:true}))
                return data as User[]
            }
            return rejectWithValue('Something went wrong');
        }catch(err) {
            console.log(err,"in friend slice")
            return rejectWithValue(err?.message);
        }
    }
)

const friendRequestSlice  = createSlice({
    name:'friendRequest' ,
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
            .addCase(fetchFriendRequests.pending , state =>{
                state.loading = true
            })
            .addCase(fetchFriendRequests.fulfilled , (state , action : PayloadAction<User[]>)=>{
                state.loading = false
                state.data = action.payload
                if(!state.initialLoading){
                    state.initialLoading = true
                }
            })
            .addCase(fetchFriendRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.initialLoading = true
              });
    }

})

export default friendRequestSlice.reducer;

export const {changeDefaultStatus} = friendRequestSlice.actions