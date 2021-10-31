import React from 'react';
import styled from 'styled-components';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px 48px;
    overflow-y: auto;
    background: grey;
`;

function TodoList() {
    return (
        <TodoListBlock>
            TodoList
        </TodoListBlock>
    );
}


export default TodoList;