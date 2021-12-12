import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';
import TodoServices from '../services/TodoServices';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px 48px;
    overflow-y: auto;
`;

function TodoList() {
    const { todos } = useTodoState();
    const dispatch = useTodoDispatch(); 
    const todoService = TodoServices(dispatch); 

    useEffect(() => {
        todoService.getData(dispatch);

    }, [dispatch]);

    if (!todos) return null

    console.log(todos);
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