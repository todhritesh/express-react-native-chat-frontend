import { createSlice , createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import getAuthToken from "../../../services/getAuthToken";
import { AxiosError } from "axios";

interface RecentChatState{
    data : any[];
    loading:boolean;
    initialLoading:boolean;
    error:any | null;
}

const initialState: RecentChatState = {
    data: [],
    loading: false,
    initialLoading: false,
    error: null,
  };

export const fetchRecentChats = createAsyncThunk<any[] , void , {rejectValue:string}>(
    'chat/fetchRecentChats',
    async (_ , {rejectWithValue}) => {
        try {
            const token = await getAuthToken()
            if(token){
                const res = await api.get('/chat/one-to-one/conversations',{
                    headers:{
                        Authorization:token
                    }
                })
                const data = res.data.conversations.map(item=>({...item,defaultStatus:true}))
                return data as any[]
            }
            return rejectWithValue('Something went wrong');
        }catch(err) {
            console.log(err,"in recent chat slice")
            return rejectWithValue(err?.message);
        }
    }
)

const recentChatSlice  = createSlice({
    name:'recentChat' ,
    initialState ,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchRecentChats.pending , state =>{
                state.loading = true
            })
            .addCase(fetchRecentChats.fulfilled , (state , action : PayloadAction<any[]>)=>{
                state.loading = false
                state.data = action.payload
                if(!state.initialLoading){
                    state.initialLoading = true
                }
            })
            .addCase(fetchRecentChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.initialLoading = true
              });
    }

})

export default recentChatSlice.reducer;