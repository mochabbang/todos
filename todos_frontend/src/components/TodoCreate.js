import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md'
import { useTodoDispatch, useTodoNextId } from '../TodoContext';
import Modal from './modal/Modal';
import TodoServices from '../services/TodoServices';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko");

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

const ModalInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 1rem;
    box-sizing: border-box;
    margin-top: 0.5rem;
`

const ModalDatePicker = styled(DatePicker)`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 1rem;
    box-sizing: border-box;
    margin-top: 0.5rem;
`

const ModalTextArea = styled.textarea`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    height: 100%;
    margin-top: 0.5rem;
`

const ModalSelect = styled.select`
    width: 150px;
    height: 2.7rem;    
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    outline: 0 none;
    margin-top: 0.5rem;
`

function TodoCreate() {   
    const [modalOpen, setModalOpen] = useState(false);
    const [todo , setTodo] = useState({
        title: '',
        description: '',
        author: '',
        due_date: new Date(),
        completed: false
    });

    const {title, description, author, due_date, completed} = todo;

    const dispatch = useTodoDispatch();
    const todoService = TodoServices(dispatch); 
    const nextId = useTodoNextId();

    const closeModal = () => {
        setModalOpen(false);
    };

    const onToggle = () => setModalOpen(!modalOpen);   
    
    const handleChange = e => {
        const {name ,value} = e.target;
        setTodo({
            ...todo,
            [name]: value
        });
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
        
        if (window.confirm("등록하시겠습니까?")) {
            const response = await todoService.postData(todo);

            if (response.status === 200) {
                alert("등록되었습니다.");   
            }

            initState();
            setModalOpen(false);
            nextId.current += 1;
            todoService.getData(dispatch);
        }    

    }

    return (
        <>
            <Modal open={ modalOpen } close={ closeModal } onSubmit={onSubmit} >
                <ModalInput
                    name="title"
                    onChange={handleChange}
                    value={title}
                    placeholder={"제목을 입력해주세요."}
                >
                </ModalInput>
                <ModalTextArea 
                    name="description"
                    onChange={handleChange}
                    value={description}
                    placeholder={"설명을 입력해주세요."}
                >                    
                </ModalTextArea>
                <ModalInput 
                    name="author"
                    onChange={handleChange}
                     value={author}
                     placeholder={"저자를 입력해주세요."}
                >                    
                </ModalInput>
                <ModalDatePicker 
                    name="due_date"
                    selected={due_date}
                    onChange={handleChange} 
                    dateFormat={"yyyy-MM-dd HH:mm:ss"}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="time"
                    placeholderText={"날짜를 입력해주세요."}
                ></ModalDatePicker>
                <ModalSelect
                    name="completed"
                    onChange={handleChange}
                    value={completed}>
                    <option value="true">완료</option>
                    <option value="false">미완료</option>
                </ModalSelect>
            </Modal>
            <CircleButton onClick={onToggle} open={modalOpen}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);