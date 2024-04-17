import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    CTable,
    CButton,
    CBadge,
} from '@coreui/react'



const ListedItems = () => { 

    const fields = [
        {
            key: 'image',
            filter: false
        },
        {
            key: 'id',
            filter: false
        },
        {
            key: 'name',
            filter: false
        },
        {
            key: 'price',
            filter: false,
            sorter: false
        },
        {
            key: 'status',
            filter: false,
            sorter: false
        },
        {
            key: 'status',
            filter: false
        }
    ]



    return (
        <CTable>
            scopedSlots={{
                    'name': (item) => {
                        return <td>{item.name}</td>
                    },
                    'ref': (item) => {
                        return <td>{item.id}</td>
                    },
                    'price': (item) => {
                        return <td>{item.price}</td>
                    },
                    'status':
                        (item) => (
                            <td>
                                <h5>
                                    {'LISTED'}
                                </h5>
                            </td>
                        ),
                    'show_details':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <Link to={`/vehicles/${item.id}`}>
                                        <CButton size="sm" color="primary" variant="outline" shape="square">
                                            VIEW
                                        </CButton>
                                    </Link>
                                </td>
                            )
                        },
                }}
        </CTable>
    )
}

export default ListedItems