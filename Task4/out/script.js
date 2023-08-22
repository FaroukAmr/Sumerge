"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function readCSV() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./data/data.csv');
            const csvData = yield response.text();
            const lines = csvData.split('\n');
            const headers = lines[0].split(',');
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const entry = {};
                for (let j = 0; j < headers.length; j++) {
                    entry[headers[j]] = values[j];
                }
                data.push(entry);
            }
            return data;
        }
        catch (error) {
            console.error('Error reading CSV file:', error);
            throw error;
        }
    });
}
function populateTable(csvData) {
    const table = document.getElementById('csvTable');
    const headerRow = table.insertRow();
    for (const header of Object.keys(csvData[0])) {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }
    for (const entry of csvData) {
        const row = table.insertRow();
        for (const header of Object.keys(csvData[0])) {
            const cell = row.insertCell();
            cell.textContent = entry[header];
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    readCSV()
        .then((data) => populateTable(data))
        .catch((error) => console.error(error));
});
