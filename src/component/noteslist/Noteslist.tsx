import React, { FC } from "react";
import { Note } from "../index";
import Singlenotes from "../singlenote/Singlenotes";
interface Props {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  handleEdit: (id: string) => void;
}

export const Noteslist: FC<Props> = ({ notes, setNotes, handleEdit }) => {
  return (
    <div>
      {notes.map((note) => (
        <Singlenotes
          note={note}
          key={note.id}
          notes={notes}
          setNotes={setNotes}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
