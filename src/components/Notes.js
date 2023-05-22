import React,{useContext, useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'


export default function Notes() {
  let navigate=useNavigate();
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
    e.preventDefault();
    console.log("updating....",note)
    editnote(note.id,note.etitle,note.edescription,note.etag)
;    refClose.current.click();
}
        const context=useContext(noteContext);
    const{notes,getNOtes,editnote}=context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
      getNOtes();
    }
    else{
      alert("please login first");
      navigate('/login');

    }
    },[getNOtes,navigate])
    const ref=useRef(null);
    const refClose=useRef(null);
    const updateNote=(currentNote)=>{
      ref.current.click();
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.description});    }
  return (  
<>
<AddNote/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} autoFocus/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
<div className="container">
<div className="row my-3">
        <h2>Your Notes</h2>
<div className="container">
  {notes.length===0 && 'no notes to display'}
</div>
{Array.isArray(notes) ? notes.map((note, index) => (
  <div className="col-md-4" key={index}>
    <div key={note._id}>
      <NoteItem note={note} updateNote={updateNote} />
    </div>
    {(index + 1) % 3 === 0 && <div className="w-100"></div>}
  </div>
)) : <p>No notes to display</p>}
</div> </div>        
</>
  )
}
