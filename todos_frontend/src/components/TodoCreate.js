import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md'
import { useTodoDispatch, useTodoNextId } from '../TodoContext';
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

// const InsertFormPositioner = styled.div`
//     width: 100%;
//     bottom: 0;
//     left: 0;
//     height:30%;
//     position: absolute;
// `;

// const InsertForm = styled.form`
//     background: #f8f9fa;
//     padding-left: 32px;
//     padding-top: 32px;
//     padding-right: 32px;
//     padding-bottom: 72px;

//     border-bottom-left-radius: 16px;
//     border-bottom-right-radius: 16px;
//     border-top: 1px solid #e9ecef;
//     height: -webkit-fill-available;
// `;

// const Input = styled.input`
//     padding: 12px;
//     border-radius: 4px;
//     border: 1px solid #dee2e6;
//     width: 100%;
//     outline: none;
//     font-size: 18px;
//     box-sizing: border-box;
// `;

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
    background: url('https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png') calc(100% - 5px) center no-repeat;
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    outline: 0 none;
    margin-top: 0.5rem;
`

function TodoCreate() {   
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setDescription] = useState('');
    const [modalCompleted, setCompleted] = useState(false);
    const [modalAuthor, setAuthor] = useState('');
    const [modalDueDate, setDueDate] = useState('');

    const dispatch = useTodoDispatch();
    const todoService = TodoServices(dispatch); 
    const nextId = useTodoNextId();

    const closeModal = () => {
        setModalOpen(false);
    };

    const onToggle = () => setModalOpen(!modalOpen);
    const onTitleChange = e => {
        setModalTitle(e.target.value);
    }; 

    const onDescriptionChange = e => {
        setDescription(e.target.value);
    };

    const onCompletedChange = e => {
        setCompleted(e.target.value);
    };

    const onAuthorChange = e => {
        setAuthor(e.target.value);
    };

    const onDueDateChange = e => {
        setDueDate(e.target.value);
    }
    
    const initState = () => {
        setModalTitle('');
        setDescription('');
        setAuthor('');
        setCompleted(!modalCompleted);
        setDueDate('');
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        if (window.confirm("등록하시겠습니까?")) {
            const response = await todoService.postData({
                "title": modalTitle,
                "description": modalDescription,
                "author": modalAuthor,
                "due_date": modalDueDate,
                "completed": modalCompleted
            });

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
                <ModalInput onChange={onTitleChange} value={modalTitle}></ModalInput>
                <ModalTextArea onChange={onDescriptionChange} value={modalDescription}></ModalTextArea>
                <ModalInput onChange={onAuthorChange} value={modalAuthor}></ModalInput>
                <ModalInput onChange={onDueDateChange} value={modalDueDate}></ModalInput>
                <ModalSelect onChange={onCompletedChange} value={modalCompleted}>
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