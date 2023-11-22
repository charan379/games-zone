import React from 'react'
import TableData from './TableData'

interface Props {
    children: React.ReactNode;
}

const TableRow: React.FC<Props> = (props) => {
    const { children } = props;
    return (
        <tr>
            {children}
        </tr>
    )
}

export default TableRow