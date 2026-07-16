import Papa from "papaparse";

const CSVExport = (data, fileName = "businesses.csv") => {

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = fileName;

    link.click();

};

export default CSVExport;