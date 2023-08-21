async function readCSV() {
  try {
    const response = await fetch('./data/data.csv');
    const csvData = await response.text();
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
  } catch (error) {
    console.error('Error reading CSV file:', error);
    throw error;
  }
}

async function populateTable(csvData) {
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
