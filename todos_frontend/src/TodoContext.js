import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialTodos = {
    loading: false,
    todos: null,
    visible: false,
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.todos.concat(action.todo);
        case 'REMOVE':
            return state.todos.filter(todo => todo.id !== action.id);
        case 'VISIBLE':
            return {
                loading: false,
            }
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

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);    

    
    
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