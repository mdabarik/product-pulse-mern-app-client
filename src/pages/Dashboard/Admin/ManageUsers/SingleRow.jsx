import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const SingleRow = ({ user, index }) => {
    let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }

    return (
        
    );
};

export default SingleRow;