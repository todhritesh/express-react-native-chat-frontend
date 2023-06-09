import { createSlice , createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import getAuthToken from "../../../services/getAuthToken";
import { AxiosError } from "axios";
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

export const fetchFriends = createAsyncThunk<User[] , void , {rejectValue:string}>(
    'friends/fetchFriends',
    async (_ , {rejectWithValue}) => {
        try {
            const token = await getAuthToken()
            if(token){
                const res = await api.get('/friends',{
                    headers:{
                        Authorization:token
                    }
                })
                const data = res.data.friends.map(item=>({...item,defaultStatus:true}))
                return data as User[]
            }
            return rejectWithValue('Something went wrong');
        }catch(err) {
            console.log(err,"in friend slice")
            return rejectWithValue(err?.message);
        }
    }
)

const friendSlice  = createSlice({
    name:'friends' ,
    initialState ,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchFriends.pending , state =>{
                state.loading = true
            })
            .addCase(fetchFriends.fulfilled , (state , action : PayloadAction<User[]>)=>{
                state.loading = false
                state.data = action.payload
                if(!state.initialLoading){
                    state.initialLoading = true
                }
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.initialLoading = true
              });
    }

})

export default friendSlice.reducer;