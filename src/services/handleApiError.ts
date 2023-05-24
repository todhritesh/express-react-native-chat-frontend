import { AxiosError } from 'axios';
import { Toast } from 'native-base';

interface ApiResponse<T> {
    data: T;
}

const handleApiError = <T>(error: AxiosError<ApiResponse<T>>) => {
    if (error.response) {
        const { status, data } = error.response;
        console.log(data,"in handleapi err")

        Toast.show({
            title: data?.message||'Something went wrong',
            duration: 3000,
            bg: 'warning.500'
        });

    }
}

export { handleApiError };
