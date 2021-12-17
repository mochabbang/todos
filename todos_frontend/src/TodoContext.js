import React, { createContext, useContext, useReducer } from 'react';

const initialTodos = {
    loading: false,
    todos: null,
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {      
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

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);    
    
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>               
                    {children}
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