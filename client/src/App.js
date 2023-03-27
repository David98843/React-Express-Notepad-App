import React from 'react'
import { useState, useEffect} from 'react'
import './bootstrap-4.0.0-dist/css/bootstrap.css'
import './icons.css'
import './App.css'
import Header from "./components/Header"
import AllNote from './components/AllNote'
import AddNote from './components/AddNote'
import ShowNote from './components/ShowNote'



const App = () => {

  const [notes, setNote] = useState([])
  const [favNotes, setFavNotes] = useState([])
  const [editedFavorite, setEditedFavorite] = useState(false)

  const getData = async () => {
    const res = await fetch('http://localhost:5000/allnote')
    const data = await res.json()
    return data['notes']
  }

  // getData()

  
  useEffect(() => {
    const setNotes = async() => {
      const notesFromServer = await getData()
      setNote(notesFromServer)
    }
    setNotes()    
  },[])

  const fetchNote = async (id) => {
    const res = await fetch(`http://localhost:5000/getnote?id=${id}`)
    const data = await res.json()

    return data
  } 

  const updateNote =  async (id, newNote) => {
    const note = await fetchNote(id)
    const updatedNote = {...note, title : newNote.title, content : newNote.content, day : newNote.day, time : newNote.time}

    const res = await fetch(`http://localhost:5000/notes/${id}`, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json' 
      },
      body : JSON.stringify(updateNote)
    })

    const newUpdate = await res.json()

    setNote([...notes, newUpdate])
  }

  const setFavorite  = async (id) => {
    const update_note = await fetchNote(id)
    const newNote = {...update_note, favorite : !update_note.favorite}

    await fetch(`http://localhost:5000/updatefavorite?id=${newNote._id}&favorite=${newNote.favorite}`)

    setNote(notes.map((note) => note.id === id ? {...note, favorite : newNote.favorite} : note))
  }

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/deletenote/${id}`)
    setNote(notes.filter((note) => note.id !== id))
  }

  const [form, showForm] = useState(false)

  const showAddForm = () => {
    showForm(true)
  }

  
  const removeForm = () => {
    showForm(false)
  }

  const AddNotes = async (note) => {
    const res = await fetch(`http://localhost:5000/addnote?title=${note.title}&content=${note.content}&day=${note.day}&time=${note.time}&favorite=${note.favorite}`)
    const new_note = await res.json()
    setNote([...notes, new_note])
  }

  const [noteState, toggleShowNote] = useState(false)
  const [display_note, setDisplayNote] = useState()
  const [showFavoriteState, setShowFavoriteState] = useState(false)

  const toggleEditedFav = () => {
    setEditedFavorite(!editedFavorite)
  }
  
  const removeShowNote = () => {
    toggleShowNote(false)
  }


  const toggleShowFavorites = (value) => {
    setShowFavoriteState(value)
  }


  return (
    <div>
      <Header showAddForm = {showAddForm}  noteState = {noteState} toggleShowFavorites = {toggleShowFavorites} />

      {noteState ? <ShowNote toggleShowNote = {removeShowNote} note = {display_note}/> : form ? <AddNote removeForm = {removeForm} AddNotes = {AddNotes} /> : <AllNote notes = {notes} favNotes = {favNotes} toggleShowNote = {toggleShowNote} setNote = {setDisplayNote} deleteNote = {deleteNote} showFavoriteState = {showFavoriteState} setFavorite = {setFavorite} toggleEditedFav = {toggleEditedFav} />}

    </div>
  )

}

export default App