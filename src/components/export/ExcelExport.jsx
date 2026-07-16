import * as XLSX from "xlsx";

const ExcelExport = (data, fileName = "businesses.xlsx") => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Businesses"
    );

    XLSX.writeFile(workbook, fileName);

};

export default ExcelExport;