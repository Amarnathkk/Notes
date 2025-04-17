import React, { useEffect, useRef, useState } from 'react'

function Notemodal({ closemodel, addNote, currentNote, Editnote }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const inputRef = useRef(null)


    useEffect(() => {
        if (currentNote) {

            setTitle(currentNote.title)
            setDescription(currentNote.description)
            
        }
    }, [currentNote])


    const handlesubmit = (e) => {
        e.preventDefault()
        if (currentNote) {
            Editnote(currentNote._id, title, description)
        }
        else {
            addNote(title, description)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] max-w-md transition-all duration-300 ease-in-out'>

                <h2 className='text-2xl font-semibold text-center text-indigo-900 mb-6'> {currentNote ? "📝 Edit Note" : "📝 Add New Note"}</h2>

                <form onSubmit={handlesubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Note Title'
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
                        ref={inputRef}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Note Description'
                        rows="4"
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
                    />

                    <div className='flex justify-end space-x-3'>
                        <button
                            type='button'
                            onClick={closemodel}
                            className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-200'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg transition duration-200'
                        >
                            {currentNote ? "Update Note" : "Add Note"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Notemodal
