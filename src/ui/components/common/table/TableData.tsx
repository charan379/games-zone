import React from 'react'

interface Props {
    children: React.ReactNode
}

const TableData: React.FC<Props> = (props) => {

    const { children } = props;
    return (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {children}
        </td>
    )
}

export default TableData