import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function NoteCard({ note, onEdit, deleteNote }) {
    return (
        <div className='bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>{note.title}</h2>
            <p className='text-gray-600 mb-4'>{note.description}</p>

            <div className='flex justify-end gap-3'>
                <button className='text-blue-600 hover:text-blue-800 transition' onClick={() => onEdit(note)}>
                    <FaEdit />
                </button>
                <button className='text-red-600 hover:text-red-800 transition' onClick={()=>deleteNote(note._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default NoteCard
