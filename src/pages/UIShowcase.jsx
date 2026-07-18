import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Checkbox from "../components/ui/Checkbox";
import Switch from "../components/ui/Switch";
import Badge from "../components/ui/Badge";

const UIShowcase = () => {
    return (
        <div className="p-10 space-y-8">

            <h1 className="text-3xl font-bold">
                Waypoint UI Components
            </h1>

            {/* Buttons */}
            <div className="flex gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
            </div>

            {/* Input */}
            <Input
                label="Business Name"
                placeholder="Enter business name"
            />

            {/* Select */}
            <Select
                label="Category"
                options={[
                    "Restaurant",
                    "Hotel",
                    "Hospital"
                ]}
            />

            {/* Checkbox */}
            <Checkbox label="Open Now" />

            {/* Switch */}
            <Switch label="Enable Location" />

            {/* Badge */}
            <div className="flex gap-2">
                <Badge variant="success">Open</Badge>
                <Badge variant="danger">Closed</Badge>
                <Badge variant="warning">Featured</Badge>
            </div>

        </div>
    );
};

export default UIShowcase;