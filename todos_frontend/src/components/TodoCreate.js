import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md'
import { useTodoDispatch } from '../TodoContext';
import Modal from './modal/Modal';
import TodoServices from '../services/TodoServices';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    ${
        props => props.open && 
            css`
                background: #ff6b6b;
                &:hover{
                    background: #ff8787;
                }
                &:active {
                    background: #fa5252;
                }
                transform: translate(-50%, 50%) rotate(45deg);
            `
    }
`;

function TodoCreate() {   
    const [modalOpen, setModalOpen] = useState(false);
    const [todo , setTodo] = useState({
        title: '',
        description: '',
        author: '',
        due_date: new Date(),
        completed: false
    });

    const dispatch = useTodoDispatch();
    const todoService = TodoServices(dispatch); 

    const closeModal = () => {
        initState();
        setModalOpen(false);
    };

    const onToggle = () => setModalOpen(!modalOpen);   
    
    const handleChange = e => {
        if (!e.target) {
            setTodo({
                ...todo,
                due_date: new Date(e)
            });
        }
        else 
        {
            const {name, value} = e.target;  

            setTodo({
                ...todo,
                [name]: value
            });
        }  
    }

    const initState = () => {
        setTodo({
            title: '',
            description: '',
            author: '',
            due_date: new Date(),
            completed: false
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(!checkValidation()) return false;

        if (window.confirm("등록하시겠습니까?")) {
            const response = await todoService.postData(todo);

            if (response.status === 200) {
                alert("등록되었습니다.");   
            }

            initState();
            setModalOpen(false);
            todoService.getData(dispatch);
        }
    }

    const checkValidation = () => {
        if (todo.title === '') {
            alert('제목을 입력해주세요!');
            return false;
        }

        if (todo.author === '') {
            alert('작성자를 입력해주세요!');
            return false;
        }

        if(todo.due_date === '') {
            alert('기간을 선택해주세요');
            return false;
        }

        return true;
    }

    return (
        <>
            <Modal 
                open={ modalOpen } 
                close={ closeModal } 
                onSubmit={onSubmit} 
                todo={todo} 
                handleChange={handleChange} 
                gubun={"C"} 
            >                
            </Modal>
            <CircleButton onClick={onToggle} open={modalOpen}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);