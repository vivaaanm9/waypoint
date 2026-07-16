import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFExport = (data) => {

    const doc = new jsPDF();

    autoTable(doc, {

        head: [["Name", "Category", "Rating"]],

        body: data.map((item) => [
            item.name,
            item.category,
            item.rating,
        ]),

    });

    doc.save("businesses.pdf");

};

export default PDFExport;