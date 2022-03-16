import React, { useEffect, useState } from "react";
import "./component/style/style.css";
import { Note } from "./component";
import { Noteslist } from "./component/noteslist/Noteslist";
import Button from "./component/button/Button";

// Main Function
function App() {
  //  getFromLocalStorge
  const addToLocalStroge = () => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    } else {
      return [];
    }
  };
  // useState us
  const [inputnotes, setinputNotes] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(addToLocalStroge());
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  // Add Notes Function
  const handeladd = (e: React.FormEvent) => {
    e.preventDefault();
    const noteObj: Note = {
      note: inputnotes,
      id: Math.random() + inputnotes,
    };
    // condition for notes if add display this otherwise some alert
    if (inputnotes) {
      setNotes([...notes, noteObj]);
      setinputNotes("");
    } else {
      alert("Please add Some Value");
    }
  };
  // When the user click on edit Button for update Notes
  const handleUpdateNote: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const updatedArr = notes.map((note) => {
      if (note.id === selectedNoteId) {
        note.note = inputnotes;
      }
      return note;
    });
    setNotes(updatedArr);
    setinputNotes("");
    setEdit(false);
  };
  // use useEffect for SetToLocalSstoge
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // add the edit function
  const handleEdit = (id: string) => {
    setEdit(true);
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note.id === id) {
        setinputNotes(note.note);
        setSelectedNoteId(note.id);
        break;
      }
    }
  };
  return (
    <div>
      <form className="input" onSubmit={edit ? handleUpdateNote : handeladd}>
        <input
          className="input_box"
          type="input"
          placeholder="Notes add here"
          onChange={(e) => setinputNotes(e.target.value)}
          value={inputnotes}
        />
        <Button text={edit ? "Update Note" : "Add note"} type="submit" />
        {edit && <Button text="Cancel" />}
      </form>

      <Noteslist notes={notes} setNotes={setNotes} handleEdit={handleEdit} />
    </div>
  );
}
export default App;
