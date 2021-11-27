import axios from 'axios';

const getData = async(dispatch) => {
    dispatch({type: 'LOADING'});
    try {
        const response = await axios.get('http://127.0.0.1:8080/api/todo/');
              
        dispatch({type:'SUCCESS', todos: response.data});
    } catch(e) {
        dispatch({type: 'ERROR', error: e});
    }
}

const putData = async(dispatch, id, todo) => {   

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }

    try {
        const response = await axios.put(`http://127.0.0.1:8080/api/todo/${id}/`, { 
            ...todo
        }, headers);

        return response;

    } catch (err) {
        return dispatch({ type: 'ERROR', error: err });
    }             
}

const deleteData = async(dispatch, id) => {   

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }

    try {
        const response = await axios.delete(`http://127.0.0.1:8080/api/todo/${id}/`, headers);

        return response;

    } catch (err) {
        return dispatch({ type: 'ERROR', error: err });
    }             
}

const postData = async(dispatch, todo) => {   

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }

    try {
        const response = await axios.post(`http://127.0.0.1:8080/api/todo/`, todo, headers);

        return response;

    } catch (err) {
        return dispatch({ type: 'ERROR', error: err });
    }             
}

export default function TodoServices (dispatch) {
    return {
        getData: () => {
            return getData(dispatch)
        },
        putData: (id, todo) => { 
            return putData(dispatch, id, todo);            
        },
        deleteData: (id) => {
            return deleteData(dispatch, id);
        },
        postData: (todo) => {
            return postData(dispatch, todo);
        }
    }
};

