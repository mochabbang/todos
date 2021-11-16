import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px 48px;
    overflow-y: auto;
`;

// 조회 함수
const getTodos = async(dispatch) => {
    dispatch({type: 'LOADING'});
    try {
        const response = await axios.get('http://127.0.0.1:8080/api/todo/');
              
        dispatch({type:'SUCCESS', todos: response.data});
    } catch(e) {
        dispatch({type: 'ERROR', error: e});
    }
}

function TodoList() {
    const todoState = useTodoState();
    const dispatch = useTodoDispatch();
    const { todos } = todoState;   

    useEffect(() => {
        getTodos(dispatch);
    }, [dispatch]);

    if (!todos) return null

    return (
        <TodoListBlock>
            {
                todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo} /> 
                ))
            }
        </TodoListBlock>
    );
}


export default TodoList;