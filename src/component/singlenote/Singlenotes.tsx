import React, { FC } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "../stylesh/style.css";
import { Note } from "../index";
interface SinglenotesProps {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notes: Note[];
  handleEdit: (id: string) => void;
}

const Singlenotes: FC<SinglenotesProps> = ({
  note,
  setNotes,
  notes,
  handleEdit,
}) => {
  const handlDone = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isDone: !note.isDone } : note
      )
    );
  };
  const handlDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="note-single">
      {note.isDone ? (
        <s className="note-single-text">{note.note}</s>
      ) : (
        <span className="note-single-text">{note.note}</span>
      )}
      <div>
        <span className="icon" onClick={() => handleEdit(note.id)}>
          <AiOutlineEdit />
        </span>
        <span className="icon" onClick={() => handlDelete(note.id)}>
          <MdDelete />
        </span>
        <span className="icon" onClick={() => handlDone(note.id)}>
          <AiOutlineCheck />
        </span>
      </div>
    </div>
  );
};

export default Singlenotes;
