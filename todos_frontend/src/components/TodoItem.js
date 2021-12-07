import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import TodoServices from '../services/TodoServices';
import Modal from '../components/modal/ModalTest';


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

// function convertDateTime(date) {
//     return new Date(new Date(date).toISOString().slice(0, 19).replace('T', ' '));
// }

function TodoItem({ todo }) {            
    const dispatch = useTodoDispatch()
    const todoService = TodoServices(dispatch); 
    const { todos } = useTodoState(); 
        
    const [modalOpen, setModalOpen] = useState(false);
    const {id, completed, title} = todo;  
    const [changeTodo, setChangeTodo] = useState(todo); 
    

    // 모달 팝업
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        todoService.getData(dispatch); 
    };

    // 작업 여부 클릭
    const onToggle = async () => {
        const response = await todoService.putData(id, {
            ...todo,
            completed: !todo.completed
        });

        if (response.status === 200) {
            todoService.getData(dispatch);
        }
    };

    // 저장 버튼
    const onSubmit = async() => {
        console.log(changeTodo);

        const response = await todoService.putData(id, changeTodo);   
        
        if (response.status === 200) {
            alert("수정되었습니다.");          
            setModalOpen(!modalOpen);

            todoService.getData(dispatch);
        }
    };

    //삭제
    const onRemove = async () => {

        if(window.confirm("삭제하시겠습니까?")) {
            const response = await todoService.deleteData(id);

            if(response.status === 204) {
                alert("삭제되었습니다.");
                todoService.getData(dispatch);
            }
        }       
        
    };

    const handleChange = e => {
        const {name, value} = e.target;
        todos.map((todo) => (todo.id === id) ? setChangeTodo({
            ...todo,
            [name]: value
        }) : todo);
        
    }
    
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
            <Modal open={ modalOpen } close={ closeModal } onSubmit={onSubmit} todo={changeTodo} onChange={handleChange} ></Modal>
        </>
    );
}

export default React.memo(TodoItem);