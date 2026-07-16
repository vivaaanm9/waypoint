import { useState } from "react";
import Badge from "../ui/Badge";

const tags = [
    "Family",
    "Weekend",
    "Office",
    "Premium",
    "Visited",
];

const TagSelector = () => {

    const [selected, setSelected] = useState([]);

    const toggleTag = (tag) => {

        setSelected((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );

    };

    return (

        <div className="flex flex-wrap gap-3">

            {tags.map((tag) => (

                <div
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="cursor-pointer"
                >

                    <Badge
                        variant={
                            selected.includes(tag)
                                ? "primary"
                                : "outline"
                        }
                    >
                        {tag}
                    </Badge>

                </div>

            ))}

        </div>

    );

};

export default TagSelector;