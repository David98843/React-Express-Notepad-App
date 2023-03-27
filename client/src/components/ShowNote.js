import React from 'react'

function ShowNote(props) {
  return (

    <div className='col p-5'>

        <div className="go-back" onClick={props.toggleShowNote}>
            <i className='ri-arrow-go-back-fill'></i>
        </div>

        <div className="row note-title show-note-title" >
            <input type="text" value = {props.note.title} />
        </div>


        <div className="row note-content show-note-content my-4">
          <textarea name="content" id="content">{props.note.content}</textarea>
        </div>
      
    </div>
  )
}

export default ShowNote
