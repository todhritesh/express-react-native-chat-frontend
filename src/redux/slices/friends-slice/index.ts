import { createSlice , createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import getAuthToken from "../../../services/getAuthToken";
import { AxiosError } from "axios";

interface Friend {
    _id:string;
    name:string;
    email:string;
}

interface FriendState{
    data : Friend[];
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

export const fetchFriends = createAsyncThunk<Friend[] , void , {rejectValue:string}>(
    'friends/fetchFriends',
    async (_ , {rejectWithValue}) => {
        try {
            const token = await getAuthToken()
            console.log(token,'token')
            if(token){
                console.log("in fiiiiff")
                const res = await api.get('/friends',{
                    headers:{
                        Authorization:token
                    }
                })
                console.log(res.data)
                return res.data.friends as Friend[]
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
            .addCase(fetchFriends.fulfilled , (state , action : PayloadAction<Friend[]>)=>{
                state.loading = false
                state.data = action.payload
                if(!state.initialLoading){
                    state.initialLoading = true
                }
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                if (state.initialLoading) {
                  state.initialLoading = false;
                }
              });
    }

})

export default friendSlice.reducer;