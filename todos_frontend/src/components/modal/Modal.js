import React from 'react';
import '../modal/modal.css';
import styled, { css, keyframes } from 'styled-components';

const ModalBackGround = styled.div`
    display: ${ ({open}) => open ? 'none' : 'flex' };
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    ${
        ({open}) => open && 
        css`
            align-items: center;
            animation: modal-bg-show .3s;
        `
    }
`;

const ModalSection = styled.section`
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: .3rem;
    background-color: #fff;
    animation: modal-show .3s;
    overflow: hidden;
`;


const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, onSubmit } = props;

    return (
        // 모달이 열릴 때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal'}>
            {
                open ? (
                    <section>
                        <header>
                            <button className="close" onClick={close}>&times;</button>
                        </header>
                        <main>
                            {props.children}
                        </main>
                        <footer>
                            <button className="close" onClick={onSubmit}> save </button>
                            &nbsp;<button className="close" onClick={close}> close </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    )
}

export default Modal;