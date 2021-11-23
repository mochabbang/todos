import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
import TodoServices from '../services/TodoServices';
import Modal from '../components/modal/Modal';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${
        props => props.completed && css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
`;

const Title = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${
        props => props.completed && css`
            color: #ced4da;
        `
    }
`;

// 모달 styled 설정
const ModalFieldDiv = styled.div`
    width: 20%;
    margin-left: 0.3rem;
    font-size: 1rem;
    box-sizing: border-box;
`

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

const ModalTextDiv =styled.div`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    font-size: 1rem;
    box-sizing: border-box;
    margin-top: 0.5rem;
    color: #ABABAB;
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
function TodoItem({ todo }) {    

    const {id, completed, title} = todo;
    const dispatch = useTodoDispatch()
    const todoService = TodoServices(dispatch); 
        
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(title);

    // 모달 팝업
    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    // 작업 여부 클릭
    const onToggle = async () => {
        const response = await todoService.putToggle(id, todo);

        if (response === 200) {
            todoService.getData(dispatch);
        }
    };
    const onRemove = () => dispatch({ type: 'REMOVE', id }); 

    const onChange = e => {
        const { value } = e.target;
        
        setModalTitle(value);
    }; 
    
    return (
        <>
            <TodoItemBlock>
                <CheckCircle completed={completed} onClick={onToggle}>
                    {completed && <MdDone />}
                </CheckCircle>
                <Title onClick={openModal} completed={completed}>
                    {title}                
                </Title>
                <Remove onClick={onRemove}>
                    <MdDelete />
                </Remove>
            </TodoItemBlock>
            {/* 모달 설정 */}
            <Modal open={ modalOpen } close={ closeModal } >
                <ModalInput onChange={onChange} value={modalTitle}></ModalInput>
                <ModalTextArea>{todo.description}</ModalTextArea>
                <ModalTextDiv>{todo.author}</ModalTextDiv>
                <ModalTextDiv>{todo.due_date}</ModalTextDiv>
                <ModalSelect>
                    <option value="true" >완료</option>
                    <option value="false">미완료</option>
                </ModalSelect>
            </Modal>
        </>
    );
}

export default React.memo(TodoItem);