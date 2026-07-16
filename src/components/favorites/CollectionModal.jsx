import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";

const CollectionModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState("");

    const handleCreate = () => {
        if (!name.trim()) return;
        onCreate(name);
        setName("");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Collection"
        >
            <div className="space-y-4">
                <Input
                    label="Collection Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleCreate}>
                        Create
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CollectionModal;