import React,{useContext} from 'react'
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';
export default function NoteItem(props) {
 const {note,updateNote}=props;
 const context=useContext(noteContext);
 const {deletenote}=context;
    return (
    <div>
<div className="row">
  
    <div className="col-md-4">
      <div className="card my-custom-card my-5 " style={{ width: "200%" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-3" onClick={() => { deletenote(note._id) }}></i>
          <i className="fa-solid fa-file-pen" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>

</div>


</div>


 


        
        

    
  )
}
