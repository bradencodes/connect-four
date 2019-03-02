import axios from 'axios';

export const FINDING_USER = 'FINDING_USER';
export const FOUND_USER = 'FOUND_USER';
export const CREATING_USER = 'CREATING_USER';
export const CREATED_USER = 'CREATED_USER';
export const ERROR = 'ERROR';

export const createUser = () => {
    const postUser = axios.post(`${process.env.REACT_APP_API_URL}/user`);
    return function(dispatch) {
        dispatch({ type: CREATING_USER, payload: true });

        postUser
            .then(res => {
                localStorage.setItem('USER_ID', res.data._id);
                dispatch({ type: CREATED_USER, payload: res.data._id});
            })
            .catch(err => {
                dispatch({ type: ERROR, payload: 'createUser error' });
            })
    }
}

export const findUser = (user_id) => {
    const getUser = axios.get(`${process.env.REACT_APP_API_URL}/user?_id=${user_id}`);
    return function(dispatch) {
        dispatch({ type: FINDING_USER, payload: true })

        getUser
            .then(res => {
                dispatch({ type: FOUND_USER, payload: res.data._id })
            })
            .catch(err => {
                dispatch({ type: ERROR, payload: 'findUser error' });
            })
    }
}
