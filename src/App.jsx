import Button from "./components/ui/Button"
import { Search } from "lucide-react";
import ErrorState from "./components/ui/ErrorState";
import Input from "./components/ui/Input";
import { i } from "framer-motion/client";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";
import Select from "./components/ui/Select";
import Checkbox from "./components/ui/Checkbox";
import Badge from "./components/ui/Badge";
import { useState } from "react";
import Tooltip from "./components/ui/Tooltip";
import Modal from "./components/ui/Modal";
import Toast from "./components/ui/Toast";
function App() {
const [checked, setChecked] = useState(false);
 const [open, setOpen] = useState(false);
 const [showToast, setShowToast] = useState(false);

 return(
    <>
    <ErrorState
    title="No Businesses Found"
    message="Try changing your search filters."
/>
    <Button
                onClick={() => setShowToast(true)}
            >
                Show Toast
            </Button>

            <Toast
                show={showToast}
                type="success"
                message="Business Added Successfully"
                onClose={() => setShowToast(false)}
            />
    <Button leftIcon={<Search size={18} />}>
    Search
    </Button>
  <LoadingSkeleton
    width="w-14"
    height="h-14"
    rounded="rounded-full"
/>
    <Input
    label="Business Name"
    placeholder="Enter business name"/>
    <Input
    placeholder="Search..."
    leftIcon={<Search size={18} />}
    error={true}/>
    <Select
    label="Business Category"
    options={[
        "Restaurant",
        "Hotel",
        "Hospital",
        "Gym",
        "School"
    ]}
/>
<Tooltip text="Add to Favorites">
    <button>⭐</button>
</Tooltip>
<Checkbox
    label="Has Website"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
/>
<Badge variant="danger">
    Closed
</Badge>
<Button
                onClick={() => setOpen(true)}
            >
                Open Modal
            </Button>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Create Collection"
            >

                <p>
                    This is the modal content.
                </p>

            </Modal>
    </>  
);
}
export default App
