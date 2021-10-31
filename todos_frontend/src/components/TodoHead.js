import React from 'react';
import styled from 'styled-components';

/* 스타일 구성 */
const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px;
    border-bottom: 1px solid #e9ecef;

    h1 {
        margin: 0
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

const TodoGetDays = () => {
    const toDay = new Date();
    const todayYMD = toDay.getFullYear() + "년" + 
                (toDay.getMonth() + 1) + "월" +
                toDay.getDate() + "일";
    const todayDay = GetDay(toDay.getDay());

    return {todayYMD, todayDay};
};

const GetDay = weekDay => {
    switch (weekDay) {
        case 0:
            return "일요일";
        case 1:
            return "월요일";
        case 2:
            return "화요일";
        case 3:
            return "수요일";
        case 4:
            return "목요일";
        case 5:
            return "금요일";
        case 6:
            return "토요일";
        default:
            return "";
    };
};

function TodoHead() {
    const { todayYMD, todayDay } = TodoGetDays();

    return (
        <TodoHeadBlock>
            <h1>{ todayYMD }</h1>
            <div className="day">{ todayDay }</div>
            <div className="tasks-left">할 일 2개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;