import { useState } from "react";
import Button from "../ui/Button";

const NotesEditor = ({ initialNote = "", onSave }) => {

    const [note, setNote] = useState(initialNote);

    return (

        <div className="space-y-4">

            <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write notes..."
                className="
                    w-full
                    rounded-xl
                    border
                    border-[#E2E8F0]
                    p-4
                    resize-none
                    outline-none
                    focus:border-[#4F46E5]
                "
            />

            <Button onClick={() => onSave(note)}>
                Save Notes
            </Button>

        </div>

    );

};

export default NotesEditor;