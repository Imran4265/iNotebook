import React, { useState } from 'react';
import NoteContext from './noteContext';




const NoteState =(props)=>{
  const host="http://localhost:5000"
    const notesInitail=[
        {
           
            
          }
    ]
    const [notes,setNotes]=useState(notesInitail);
    //fetch all notes
    const getNOtes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
          headers: {
          "Content-Type": "application/json",
"auth-token":localStorage.getItem("token")
          
        },
      
       }); 
       const json=await  response.json(); 
       console.log(json);
       setNotes(json);
      }
   //add note
 const addNote = async(title,description,tag)=>{
  console.log("trying")
  try {
    const response = await fetch('http://localhost:5000/api/notes/addnotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
  
    const newNote = await response.json();
    console.log(newNote);
    console.log("ADDING NOTE");
    setNotes([...notes, newNote]);
    
  } catch (error) {
    console.error(error);
  }
  
  
    
   
  } ;
  //delete notes
  const deletenote=async(id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
        headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      },
    
     });
     const json= await response.json(); 
     console.log(json);


    console.log(id);
  const  newNotes =notes.filter((note)=>{
   return note._id!==id;
  });setNotes(newNotes)
  }
  
  
  //edit notes
  const editnote=async (id,title,description,tag)=>{
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
        headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      },
      body: JSON.stringify({title,description,tag}),
     }); 
     const json= await response.json(); 
     console.log(json);
      
    
let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);

  }
    return (
    <div className="row">
<NoteContext.Provider value={{notes,setNotes,addNote,deletenote,getNOtes,editnote}}>
{props.children}
        </NoteContext.Provider>
    </div>
        
    )
}
export default NoteState;