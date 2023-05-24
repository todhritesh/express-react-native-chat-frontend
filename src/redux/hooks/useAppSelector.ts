import {useSelector} from 'react-redux';
import {RootState} from '../store';

function useAppSelector<T>(cb: (state: RootState) => T) {
  return useSelector<RootState, T>(cb);
}

export default useAppSelector;