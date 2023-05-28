import { useState } from "react";
import User from "../../../types/auth";
import api from "../../../services/api";
import useAppSelector from "../../../redux/hooks/useAppSelector";
import getAuthToken from "../../../services/getAuthToken";
import useAppDispatch from "../../../redux/hooks/useAppDispatch";
import { changeDefaultStatus } from "../../../redux/slices/friend-requests-slice";

export default function useFriendRequest(user : User ) : [boolean , boolean, string | null , ()=>void , ()=> void] {
    const [acceptLoading , setAcceptLoading] = useState(false)
    const [rejectLoading , setRejectLoading] = useState(false)
    const [error , setError] = useState(null)
    const authInfo = useAppSelector(state=>state.auth)
    const dispatch = useAppDispatch()

    const acceiptRequest = async () => {
        try{
            setAcceptLoading(true)
            const token = await getAuthToken()
            const res = await api.post('/friends/accept-request',{
                receiverId:user._id
            },{
                headers:{
                    Authorization:token
                }
            })
            console.log(res,"in accept request hook")
            dispatch(changeDefaultStatus(user._id))
        }catch(err){
            console.log(err.message)
            setError(err.mesage)
        } finally  {
            setAcceptLoading(false)
        }
    }
    const rejectRequest = async () => {
        try{
            setRejectLoading(true)
            const token = await getAuthToken()
            const res = await api.post('/friends/reject-request',{
                receiverId:user._id
            },{
                headers:{
                    Authorization:token
                }
            })
        }catch(err){
            console.log(err)
            setError(err.mesage)
        } finally  {
            setRejectLoading(false)
        }
    }

    return [acceptLoading,rejectLoading,error,acceiptRequest,rejectRequest]

}