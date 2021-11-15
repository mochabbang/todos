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

const putToggle = async(dispatch, id, todo) => {   

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }

    try {
        const response = await axios.put(`http://127.0.0.1:8080/api/todo/${id}/`, { 
            ...todo,
            completed : !todo.completed
        }, headers);

        return response.status;

    } catch (err) {
        return dispatch({ type: 'ERROR', error: err });
    }             
}

export default function TodoServices (dispatch) {
    return {
        getData: () => getData(dispatch),
        putToggle: (id, todo) => { 
            return putToggle(dispatch, id, todo);            
        } 
    }
};

