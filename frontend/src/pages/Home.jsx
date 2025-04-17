import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'
import Notemodal from '../Components/Notemodal'
import axios from 'axios'
import NoteCard from '../Components/NoteCard'
import { toast } from 'react-toastify';

function Home() {

  const [isModalOpen, setmodalopen] = useState(false)

  const [notes, setnotes] = useState([])

  const [currentNote, setCurrentNote] = useState(null)

  const [query, setquery] = useState('')

  const [filterednotes, setfilterednotes] = useState([])


  useEffect(() => {

    fetchNotes()

  }, [])


  // Filtering the notes-----------

  useEffect(() => {
    if (!Array.isArray(notes)) return;

    setfilterednotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, notes])


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`

        }
      })
      setnotes(data.notes)

    }
    catch (error) {
      console.log(error);

    }

  }

  const closemodel = () => {
    setmodalopen(false)
  }


  const onEdit = (note) => {
    setCurrentNote(note)
    setmodalopen(true)
  }


  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      );


      if (response.data.success) {

        closemodel()
        fetchNotes()
        toast.success("Note Added Successfully")
      }


    }
    catch (error) {
      console.log(error);


    }
  }


  const Editnote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      );


      if (response.data.success) {

        closemodel()
        fetchNotes()
        toast.success("Note Updated Successfully")
      }
    }

    catch (error) {
      console.log(error);


    }

  }


  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      if (response.data.success) {


        fetchNotes()
        toast.success("Note Deleted")
      }
    }

    catch (error) {
      console.log(error);


    }


  }


  return (
    <div className='bg-gray-100  min-h-screen'>

      <Navbar setquery={setquery} />

      <div className='px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

        {
          filterednotes.length > 0 ? filterednotes.map((note) => (
            <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
          ))
            :
            <div className="col-span-full text-center text-gray-500 text-xl font-semibold mt-10">
              No Notes Found
            </div>
        }

      </div>





      <button
        onClick={() => setmodalopen(true)}
        className="bg-gray-800 hover:bg-indigo-900 text-white fixed font-bold w-14 h-14 rounded-full right-4 bottom-4 shadow-lg text-2xl transition duration-300">
        +
      </button>

      {isModalOpen && <Notemodal
        closemodel={closemodel}
        addNote={addNote}
        currentNote={currentNote}
        Editnote={Editnote}
      />}

    </div>
  )
}

export default Home