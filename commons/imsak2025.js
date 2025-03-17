   // Complete data for the table
   const data = [
    ["HARI", "TANGGAL", "IMSAK", "SUBUH", "TERBIT", "DUHA", "ZUHUR", "ASAR", "MAGRIB", "ISYA"],
    ["Sabtu", 1, "04:33", "04:43", "05:55", "06:22", "12:08", "15:12", "18:15", "19:24"],
    ["Minggu", 2, "04:33", "04:43", "05:55", "06:22", "12:08", "15:11", "18:14", "19:23"],
    ["Senin", 3, "04:33", "04:43", "05:55", "06:22", "12:08", "15:10", "18:14", "19:23"],
    ["Selasa", 4, "04:33", "04:43", "05:55", "06:22", "12:08", "15:08", "18:14", "19:23"],
    ["Rabu", 5, "04:33", "04:43", "05:55", "06:22", "12:08", "15:08", "18:13", "19:22"],
    ["Kamis", 6, "04:33", "04:43", "05:55", "06:22", "12:07", "15:08", "18:13", "19:22"],
    ["Jumat", 7, "04:33", "04:43", "05:55", "06:22", "12:07", "15:09", "18:12", "19:21"],
    ["Sabtu", 8, "04:33", "04:43", "05:55", "06:22", "12:07", "15:09", "18:12", "19:21"],
    ["Minggu", 9, "04:33", "04:43", "05:55", "06:22", "12:07", "15:10", "18:12", "19:20"],
    ["Senin", 10, "04:33", "04:43", "05:55", "06:22", "12:06", "15:10", "18:11", "19:20"],
    ["Selasa", 11, "04:33", "04:43", "05:55", "06:22", "12:06", "15:10", "18:11", "19:19"],
    ["Rabu", 12, "04:33", "04:43", "05:54", "06:22", "12:06", "15:11", "18:10", "19:19"],
    ["Kamis", 13, "04:33", "04:43", "05:54", "06:22", "12:06", "15:11", "18:10", "19:18"],
    ["Jumat", 14, "04:33", "04:43", "05:54", "06:21", "12:05", "15:11", "18:09", "19:18"],
    ["Sabtu", 15, "04:33", "04:43", "05:54", "06:21", "12:05", "15:12", "18:09", "19:17"],
    ["Minggu", 16, "04:33", "04:43", "05:54", "06:21", "12:05", "15:12", "18:08", "19:17"],
    ["Senin", 17, "04:32", "04:42", "05:54", "06:21", "12:04", "15:12", "18:08", "19:16"],
    ["Selasa", 18, "04:32", "04:42", "05:54", "06:21", "12:04", "15:12", "18:07", "19:16"],
    ["Rabu", 19, "04:32", "04:42", "05:54", "06:21", "12:04", "15:13", "18:07", "19:15"],
    ["Kamis", 20, "04:32", "04:42", "05:54", "06:21", "12:04", "15:13", "18:07", "19:15"],
    ["Jumat", 21, "04:32", "04:42", "05:54", "06:21", "12:04", "15:14", "18:07", "19:15"],
    ["Sabtu", 22, "04:32", "04:42", "05:53", "06:20", "12:03", "15:14", "18:06", "19:14"],
    ["Minggu", 23, "04:32", "04:42", "05:53", "06:20", "12:03", "15:13", "18:05", "19:14"],
    ["Senin", 24, "04:32", "04:42", "05:53", "06:20", "12:02", "15:14", "18:05", "19:13"],
    ["Selasa", 25, "04:32", "04:42", "05:53", "06:20", "12:02", "15:14", "18:04", "19:13"],
    ["Rabu", 26, "04:31", "04:41", "05:53", "06:20", "12:02", "15:14", "18:04", "19:12"],
    ["Kamis", 27, "04:31", "04:41", "05:53", "06:20", "12:02", "15:14", "18:03", "19:12"],
    ["Jumat", 28, "04:31", "04:41", "05:53", "06:20", "12:01", "15:14", "18:03", "19:11"],
    ["Sabtu", 29, "04:31", "04:41", "05:52", "06:20", "12:01", "15:14", "18:02", "19:11"],
    ["Minggu", 30, "04:31", "04:41", "05:52", "06:19", "12:01", "15:14", "18:02", "19:10"]
]


// Function to create the table
function createTable(data) {
    const tableHeader = document.querySelector("#prayerTimesTable thead");
    const tableBody = document.querySelector("#prayerTimesTable tbody");

    // Create header row
    const headerRow = document.createElement("tr");
    data[0].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Create data rows
    for (let i = 1; i < data.length; i++) {
        const row = document.createElement("tr");
        data[i].forEach(cellText => {
            const td = document.createElement("td");
            td.textContent = cellText;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    }
    highlightTodayRow();
}

function highlightTodayRow() {
    const today = new Date().getDate().toString(); // Get today's date (day only)
    const rows = document.querySelectorAll("#prayerTimesTable tbody tr");

    rows.forEach(row => {
        const dateCell = row.querySelector("td:nth-child(2)"); // Second column (TANGGAL)
        if (dateCell && dateCell.textContent === today) {
            row.classList.add("highlight"); // Add highlight class
        }
    });
}
// Call the function to create the table
createTable(data);