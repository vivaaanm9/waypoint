import Button from "../ui/Button";

const ExportButton = ({ onCSV, onExcel, onPDF }) => {

    return (

        <div className="flex gap-3">

            <Button
                variant="outline"
                onClick={onCSV}
            >
                CSV
            </Button>

            <Button
                variant="secondary"
                onClick={onExcel}
            >
                Excel
            </Button>

            <Button
                variant="danger"
                onClick={onPDF}
            >
                PDF
            </Button>

        </div>

    );

};

export default ExportButton;