import React, { useEffect, useState } from "react";
import "./component/stylesh/style.css";
import { Note } from "./component";
import { Noteslist } from "./component/noteslist/Noteslist";
import Button from "./component/Button/Button";

function App() {
  const addToLocalStroge = () => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    } else {
      return [];
    }
  };
  const [inputnotes, setinputNotes] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(addToLocalStroge());
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  const handeladd = (e: React.FormEvent) => {
    e.preventDefault();
    const noteObj: Note = {
      note: inputnotes,
      id: Math.random() + inputnotes,
    };
    if (inputnotes) {
      setNotes([...notes, noteObj]);
      setinputNotes("");
    } else {
      alert("add valued value");
    }
  };

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

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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
