import { createStore } from 'redux';
import denpaioReducer from '../reducers/denpaioReducer';

const configureStore = (railsProps) => (
  createStore(denpaioReducer, railsProps)
);

export default configureStore;
