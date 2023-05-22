import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
export default function AddNote() {
    const context= useContext(noteContext);
    const{addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
}
    return (
    <div>
      <div>
      <div className="container">
      <h1>Enter Notes</h1>
      <form>
  <div className="mb-3">
    <label htmlhtmlfor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"name='title'  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlhtmlfor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlhtmlfor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
      </div>
        </div>
    </div>
  )
}
