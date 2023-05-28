import { useState } from "react";
import User from "../../../types/auth";
import api from "../../../services/api";
import useAppSelector from "../../../redux/hooks/useAppSelector";
import getAuthToken from "../../../services/getAuthToken";
import useAppDispatch from "../../../redux/hooks/useAppDispatch";
import { changeDefaultStatus } from "../../../redux/slices/non-friends-slice";

export default function useSendFriendRequest(user : User ) : [boolean , string | null , ()=> void] {
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)
    const authInfo = useAppSelector(state=>state.auth)
    const dispatch = useAppDispatch()

    const sendFriendRequest = async () => {
        try{
            setLoading(true)
            const token = await getAuthToken()
            const res = await api.post('/friends/send-request',{
                receiverId:user._id
            },{
                headers:{
                    Authorization:token
                }
            })
            console.log(res,"in find friend hook")
            dispatch(changeDefaultStatus(user._id))
        }catch(err){
            console.log(err)
            setError(err.mesage)
        } finally  {
            setLoading(false)
        }
    }

    return [loading,error,sendFriendRequest]

}