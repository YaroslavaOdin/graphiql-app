import { useDispatch } from 'react-redux';
import { historySlice } from '../store/reducers/historySlice';
import { bindActionCreators } from '@reduxjs/toolkit';

const AllActions = {
  ...historySlice.actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};

export default useActions;
