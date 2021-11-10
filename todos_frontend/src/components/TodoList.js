import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px 48px;
    overflow-y: auto;
`;

function TodoList() {
    const todoState = useTodoState();
    const { todos } = todoState;   

    if (!todos) return null;

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