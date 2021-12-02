import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialTodos = {
    loading: false,
    todos: null,
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_VALUE': 
            return state.todos.filter(todo => {
                if (todo.id === action.todo.id) {
                    return {
                        ...todo,
                        title: action.todo.title,
                        description : action.todo.description,
                        author: action.todo.author,
                        due_date: action.todo.due_date,
                        completed: action.todo.completed
                    };
                }
                else {
                    return todo;
                }
            });        
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
    const nextId = useRef(100);    

    
    
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