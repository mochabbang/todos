import React from 'react';
import '../modal/modal.css';


const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, onEdit } = props;

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
                            <button className="close" onClick={onEdit}> save </button>
                            &nbsp;<button className="close" onClick={close}> close </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    )
}

export default Modal;