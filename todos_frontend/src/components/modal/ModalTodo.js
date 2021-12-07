import React from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko");

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

function convertDateTime(date) {
    return new Date(new Date(date).toISOString().slice(0, 19).replace('T', ' '));
}

function ModalTodo({todo, handleChange}) {    
    const {completed, title, description, author, due_date} = todo;   
    const changeDueDate = convertDateTime(due_date);

  return (
      <>
        <ModalInput
          onChange={handleChange}
          name="title"
          defaultValue={title}
          placeholderholder={"제목을 입력해주세요."}
        ></ModalInput>
        <ModalTextArea
          onChange={handleChange}
          name="description"
          defaultValue={description}
          placeholder={"설명을 입력해주세요."}
        ></ModalTextArea>
        <ModalTextDiv placeholder={"작성자를 입력해주세요."}>
          {author}
        </ModalTextDiv>
        <ModalDatePicker
          name="due_date"
          value={changeDueDate}
          selected={changeDueDate}
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
          defaultValue={completed}
        >
          <option value="true">완료</option>
          <option value="false">미완료</option>
        </ModalSelect>
      </>
    );
}

export default ModalTodo;