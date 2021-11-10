import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

// const initialTodos = [
//     {
//         id: 1,
//         title: '프로젝트 생성하기',
//         description: '프로젝트 생성 설명 블라블라',
//         author: 'Daniel',
//         due_date: '2021-11-05',
//         done: true
//     },
//     {
//         id: 2,
//         title: '컴포넌트 스타일링하기',
//         description: '컴포넌트 설명 블라블라',
//         author: 'Alex',
//         due_date: '2021-11-05',
//         done: true
//     },
//     {
//         id: 3,
//         title: 'Context 만들기',
//         description: 'Context 설명 블라블라',
//         author: 'Elsa',
//         due_date: '2021-11-07',
//         done: false
//     },
//     {
//         id: 4,
//         title: '기능 구현하기',
//         description: '기능 구현하기 설명 블라블라',
//         author: 'Que',
//         due_date: '2021-11-07',
//         done: false
//     }
// ];

const initialTodos = {
    loading: false,
    todos: null,
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.todos.concat(action.todo);
        case 'TOGGLE':
            return state.todos.map(todo => todo.id === action.id ? putToggle({
                ...todo,
                completed: !todo.completed
            }) : todo);
        case 'REMOVE':
            return state.todos.filter(todo => todo.id !== action.id);
        case 'LOADING':
            return {
                loading: true,
                todos: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                todos: action.todos,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                todos: null,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext()        
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

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

const putToggle = async(toggleTodo) => {   

    const response = await axios.put('http://127.0.0.1:8080/api/todo/' + toggleTodo.id + '/', toggleTodo, headers);

    if (response.status === 200) {
        return toggleTodo;
    }
    else {
        alert("Error");
        return toggleTodo;
    }
}

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);    

    useEffect(() => {
        getTodos(dispatch);
    }, []);
    
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);

    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);

    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);

    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}