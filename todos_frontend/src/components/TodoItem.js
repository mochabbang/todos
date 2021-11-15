import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
import TodoServices from '../services/TodoServices';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${
        props => props.completed && css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
`;

const Title = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${
        props => props.completed && css`
            color: #ced4da;
        `
    }
`;

// const headers = {
//     'Content-Type': 'application/json',
//     'Accept': '*/*'
// }

// // 조회 함수
// const getTodos = async(dispatch) => {
//     dispatch({type: 'LOADING'});
//     try {
//         const response = await axios.get('http://127.0.0.1:8080/api/todo/');
              
//         dispatch({type:'SUCCESS', todos: response.data});
//     } catch(e) {
//         dispatch({type: 'ERROR', error: e});
//     }
// }


function TodoItem({ todo }) {    

    const {id, completed, title} = todo;
    const dispatch = useTodoDispatch()
    const todoService = TodoServices(dispatch);

    const onToggle = () => {
        const response = todoService.putToggle(id, todo);

        if (response === 200) {
            todoService.getData(dispatch);
        }
    };
    const onRemove = () => dispatch({ type: 'REMOVE', id });   
    
    return (
        <TodoItemBlock>
            <CheckCircle completed={completed} onClick={onToggle}>
                {completed && <MdDone />}
            </CheckCircle>
            <Title completed={completed}>{title}</Title>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);