import axios from "axios";
import useAppSelector from "../../redux/hooks/useAppSelector";

export default function useAuthApi(){
    const auth = useAppSelector(state=>state.auth)

    return axios.create({
        baseURL:'http://192.168.1.6:4000/api',
        headers:{
            Authorization:`Bearer ${auth.token}`
        }
    })
}
