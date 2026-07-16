import Button from "../ui/Button";
import Badge from "../ui/Badge";

const CollectionsPage = ({ collections = [] }) => {

    return (
        <div className="grid gap-5">

            {collections.map((collection) => (

                <div
                    key={collection.id}
                    className="border rounded-2xl p-5 shadow-sm"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="text-lg font-semibold">
                                {collection.name}
                            </h2>

                            <Badge variant="secondary">
                                {collection.businesses.length} Businesses
                            </Badge>

                        </div>

                        <Button size="sm">
                            View
                        </Button>

                    </div>

                </div>

            ))}

        </div>
    );

};

export default CollectionsPage;