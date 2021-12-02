import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
import TodoServices from '../services/TodoServices';
import Modal from '../components/modal/Modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko");

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
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    outline: 0 none;
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

// function convertDateTime(date) {
//     return new Date(new Date(date).toISOString().slice(0, 19).replace('T', ' '));
// }

function TodoItem({ todo }) {    

    const {id, completed, title, description, author, due_date} = todo;
    
    const dispatch = useTodoDispatch()
    const todoService = TodoServices(dispatch); 
        
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalTitle, setModalTitle] = useState(title);
    // const [modalDescription, setDescription] = useState(description)
    // const [modalCompleted, setCompleted] = useState(completed)
    // const [modalDueDate, setDueDate] = useState(convertDateTime(due_date));

    const handleChange = e => {
        const {name, value} = e.target;
        
        
    };

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
        const response = await todoService.putData(id, todo);   
        
        if (response.status === 200) {
            alert("수정되었습니다.");          
            // setModalTitle(response.data.title);
            // setDescription(response.data.description);
            // setCompleted(response.data.completed);
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

    // const onTitleChange = e => {
        // setModalTitle(e.target.value);
    // }; 
// 
    // const onDescriptionChange = e => {
        // setDescription(e.target.value);
    // };
// 
    // const onCompletedChange = e => {
        // setCompleted(e.target.value)
    // };
// 
    // const onDueDateChange = e => {
        // setDueDate(e);
    // }
    
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
            <Modal open={ modalOpen } close={ closeModal } onSubmit={onSubmit} >
                <ModalInput 
                    onChange={handleChange} 
                    name="title"
                    value={title} 
                    placeholderholder={'제목을 입력해주세요.'}
                ></ModalInput>
                <ModalTextArea 
                    onChange={handleChange} 
                    name="description"
                    value={description}
                    placeholder={"설명을 입력해주세요."}></ModalTextArea>
                <ModalTextDiv placeholder={"작성자를 입력해주세요."}>{author}</ModalTextDiv>
                <ModalDatePicker 
                    name="due_date"
                    value={due_date}
                    selected={due_date}
                    onChange={handleChange}
                    dateFormat={"yyyy-MM-dd HH:mm:ss"}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                ></ModalDatePicker>
                <ModalSelect 
                    onChange={handleChange}
                    name="completed"
                    value={completed}
                >
                    <option value="true">완료</option>
                    <option value="false">미완료</option>
                </ModalSelect>
            </Modal>
        </>
    );
}

export default React.memo(TodoItem);