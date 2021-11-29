import React from 'react';
import '../modal/modal.css';
import styled, { css, keyframes } from 'styled-components';

const modalShow = keyframes`
    from {
        opacity: 0;
        margin-top: -50px;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
`;

const modalBgShow = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

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
            animation: ${ modalBgShow } .3s;
        `
    }
`;

const ModalSection = styled.section`
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: .3rem;
    background-color: #fff;
    animation: ${ modalShow } .3s;
    overflow: hidden;
    
`;

const ModalHeader = styled.header``;

const ModalMain = styled.main`
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
`;

const ModalFooter = styled.footer`
    padding: 12px 16px;
    text-align: right;
`;

const ModalHeaderButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
`;

const ModalFooterButton = styled.button`
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
`;

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, onSubmit } = props;

    return (
        // 모달이 열릴 때 openModal 클래스가 생성된다.
        // <div className={ open ? 'openModal modal' : 'modal'}>
        //     {
        //         open ? (
        //             <section>
        //                 <header>
        //                     <button className="close" onClick={close}>&times;</button>
        //                 </header>
        //                 <main>
        //                     {props.children}
        //                 </main>
        //                 <footer>
        //                     <button className="close" onClick={onSubmit}> save </button>
        //                     &nbsp;<button className="close" onClick={close}> close </button>
        //                 </footer>
        //             </section>
        //         ) : null
        //     }
        // </div>
        <ModalBackGround>
            {
                open ? (
                    <ModalSection>
                        <ModalHeader>
                            <ModalHeaderButton onClick={close}>&times;</ModalHeaderButton>                            
                        </ModalHeader>
                        <ModalMain>
                                {props.children}
                        </ModalMain>
                        <ModalFooter>
                            <ModalFooterButton onClick={onSubmit}> save </ModalFooterButton>
                            &nbsp;<ModalFooterButton onCLick={close}> close </ModalFooterButton>
                        </ModalFooter>
                    </ModalSection>
                ) : null
            }
        </ModalBackGround>
    )
}

export default Modal;