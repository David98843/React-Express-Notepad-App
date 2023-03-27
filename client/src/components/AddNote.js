import React from "react";
import { useState } from "react";

const AddNote = (props) => {
    
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [favorite, setFavorite] = useState(false)

    const text_area = document.getElementsByTagName('textarea')[0]
    const displayer = document.getElementsByClassName('displayer')[0]

    const makeItalics = () => {
        text_area.classList.toggle('itals-text')
    }

    const makeBold = () => {

        const allText = content
        const allTextList = allText.split(' ')
        const lastText = allTextList[allTextList.length - 1] || allTextList[allTextList.length - 2] 

        const newlastText = `<b>${lastText}</b>`
        allTextList[allTextList.length -1 ] = newlastText
        text_area.innerHTML = String(allTextList)

        // displayer

        // const text_area = document.getElementsByTagName('textarea')[0]
        // let text_list = text_area.value.split(' ')
        // text_list[text_list.length-1] = res
        // text_list = String(text_list)
        // text_area.innerText = text_list
    }


    return (

        <div className="p-5">

            <div className="go-back go-back-2" onClick={props.removeForm}>
                <i className='ri-arrow-go-back-fill'></i>
            </div>


            <h2>Add Note</h2>
            <form onSubmit = {e => {
                e.preventDefault();
                const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] 
                const note = {
                    title,
                    content,
                    day : `${months[new Date().getMonth()]} ${new Date().getDate()}`,
                    time : `${new Date().getHours()}:${new Date().getMinutes()}`,
                    favorite
                }
                props.AddNotes(note)
                alert('Note has been successfully added')
                props.removeForm()
                setContent()
                setTitle()
            }} >
                <div className="col">
                    <div className="row my-3">
                        <input
                         type="text" 
                         name="title" 
                         id="title" 
                         placeholder="Title"
                         value={title}
                         onChange = {e => setTitle(e.target.value)}
                         />
                    </div>
                    
                    <div className="row xyz">
                        <div className="displayer">
                        </div>
    
                        <textarea
                        itemID="textarea"
                        name="content" 
                        id="content" 
                        cols="30" 
                        rows="7" 
                        placeholder="Content "
                        value = {content}
                        onChange = {e => {
                            // let displayer = document.getElementsByClassName('displayer')[0]
                            // displayer.innerHTML = e.target.innerText
                            setContent(e.target.value)
                        }}
                        >
                        </textarea>
                    </div>
                    {/* <div className="row edit-btns mb-3 p-2">
                        <div className="col m-1" onClick={makeItalics}>
                            <i>I</i>
                        </div>
                        <div className="col m-1" onClick={makeBold}>
                            <b>B</b>
                        </div>
                        <div className="col m-1">
                            <li>list</li>
                        </div>

                    </div> */}

                    <div className="row">
                        <input type="submit" className = 'btn btn-primary p-3 mt-3' value='Add Note' />
                    </div>
                </div>
            </form>
        </div>

    )
}

export default AddNote