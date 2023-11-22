import React from 'react'

interface Props {
    children: React.ReactNode;
    show: boolean
}
const Modal: React.FC<Props> = (props) => {
    const { children, show } = props;

    if (!show) {
        return;
    }

    return (
        <div className='h-full w-full fixed z-[1009] bg-transparent bg-slate-400 backdrop-blur-md top-0 left-0 flex flex-wrap flex-col items-center justify-start'>
            {/* <button className='w-[50px] h-[50px] rounded-full absolute text-center p-1 text-3xl border-none flex justify-center items-center z-[999] bg-red-500 text-slate-50'>
                X
            </button> */}
            {children}
        </div>
    )
}

export default Modal