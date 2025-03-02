let userData;
let filterChecked = "nama";
//================================Start fetch kompdata ======================================================

function doPostAllKar() {
    const url = 'https://script.google.com/macros/s/AKfycbzveJ5ziwpytUURoeKZKGCU80kjJQfZ5listjbenqTSye67X2npQA8uxbMIYxXfQ25U/exec';

    // Define the data to be sent in the POST request
    const data = new URLSearchParams({
        frmActionx: 'allkar'
    });

    // Send a POST request using fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const myObj = JSON.parse(data);
            userData = myObj.retval;
            // console.log(Object.keys(myObj));
            console.log(myObj.retval);
            data2table(userData);
        })
        .catch(error => {
            // console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('txtoutputuser01').value = "Error Data fetching";
        });
}


function toTitleCase(str) {
    return str
        .toLowerCase() // Convert the entire string to lowercase
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("txtoutputuser01").value = `${text}`;
        console.log(`Copied: ${text}`);
    }).catch(err => {
        document.getElementById("txtoutputuser01").value = "Failed to copy text";
        console.error('Failed to copy text: ', err);
    });
}

// Function to handle column button click
function handleFourthColumnButtonClick(event) {
    event.preventDefault();
    const value = event.target.dataset.value;
    console.log(`Fourth column button clicked with value: ${value}`);
    // You can add your logic here
}



function getSVGbtn(x) {
    if (x == 2) {
        const template = document.getElementById("btn2svgtmpl");
        return template.content.cloneNode(true);
    } else if (x == 3) {
        const template = document.getElementById("btn3svgtmpl");
        return template.content.cloneNode(true);
    }
}

function data2table(data) {
    let row0 = "";
    let row1 = "";
    const tableBody = document.querySelector("#myTable tbody");
    tableBody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement("tr");


        const td1 = document.createElement("td");
        const button1 = document.createElement("button");
        button1.textContent = row[1];
        button1.classList.add("first-button");
        button1.classList.add("btnInsideTbl");
        td1.appendChild(button1);
        tr.appendChild(td1);



        row0 = row[0].substring(1);
        const td2 = document.createElement("td");
        const button2 = document.createElement("button");
        button2.classList.add("second-button");
        button2.classList.add("btnWsvg");
        button2.dataset.value = row0;
        const svgClone2 = getSVGbtn(2);
        button2.appendChild(svgClone2);
        // button2.append(` ${row0}`);
        td2.appendChild(button2);
        tr.appendChild(td2);


        const td3 = document.createElement("td");
        const button3 = document.createElement("button");
        button3.classList.add("third-button");
        button3.classList.add("btnWsvg");
        button3.dataset.value = row[2];
        const svgClone3 = getSVGbtn(3);
        button3.appendChild(svgClone3);
        // button3.append(` ${row[2]}`);
        td3.appendChild(button3);
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        const button4 = document.createElement("button");
        button4.textContent = row[3];
        button4.classList.add("fourth-button");
        button4.classList.add("btnInsideTbl");
        button4.dataset.value = row0;
        td4.appendChild(button4);
        tr.appendChild(td4);
        

        const td5 = document.createElement("td");
        const button5 = document.createElement("button");
        button5.textContent = row[4];
        button5.classList.add("fifth-button");
        button5.classList.add("pupuskalo");
        button5.classList.add("btnInsideTbl");
        td5.appendChild(button5);
        tr.appendChild(td5);

        tableBody.appendChild(tr);
    });


};


// Event delegation for fourth column buttons
document.addEventListener("click", function (event) {

    if (event.target.matches(".first-button")) {
        const buttonText = event.target.textContent; // Get the button text
        const fixbtnTxt = toTitleCase(buttonText); // Get the button text
        copyToClipboard(fixbtnTxt);
    }

    const secondButton = event.target.closest(".second-button");
    if (secondButton) {
        event.preventDefault();
        const value = secondButton.dataset.value;
        copyToClipboard(value);
    }

    const thirdButton = event.target.closest(".third-button");
    if (thirdButton) {
        event.preventDefault();
        const value = thirdButton.dataset.value;
        copyToClipboard(value);
    }

    if (event.target.matches(".fourth-button")) {
        handleFourthColumnButtonClick(event);
    }
});

// document.getElementById('btnfetchAllKar').addEventListener('click', doPostAllKar);

//================================End fetch kompdata======================================================

//================================Start ======================================================

// Function to filter userData based on the input value
function filterUserData() {
    console.clear();
    const searchValue = document.getElementById("txtsearchuser").value.trim().toLowerCase();
    let col2filter = 1;
    if (filterChecked) {
        switch (filterChecked) {
          case "nip":
            col2filter = 0;
            console.log("Selected value: NIP");
            break;
          case "nama":
            col2filter = 1;
            console.log("Selected value: Nama");
            break;
          case "pass":
            col2filter = 2;
            console.log("Selected value: Pass");
            break;
          case "bidang":
            col2filter = 3;
            console.log("Selected value: Lain");
            break;
          default:
            col2filter = 0;
            console.log("Unknown radio button value");
        }
      } else {
        col2filter = 1;
        console.log("No radio button selected.");
      }
      console.log(col2filter);
    const filteredData = userData.filter((row) => {
        return row[col2filter].toString().toLowerCase().includes(searchValue);
    });
    console.log(filteredData);
    data2table(filteredData);
}
document.getElementById("txtsearchuser").addEventListener("input", filterUserData);

//================================End ======================================================

//================================Start ======================================================

function getRbfltrValue() {
    const radioButtons = document.getElementsByName("rbfltr");
    let selectedValue = null;

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            break;
        }
    }

    if (selectedValue) {
        filterChecked = selectedValue;
        console.log("Selected rbfltr value:", filterChecked);
        return selectedValue; // Optionally return the value
    } else {
        console.log("No rbfltr radio button selected.");
        return null; // Or return undefined, or whatever you prefer
    }
}

document.querySelectorAll('input[name="rbfltr"]').forEach((radio) => {
    radio.addEventListener('change', getRbfltrValue);
    document.getElementById("txtsearchuser").value ="";
});

//================================End ======================================================



doPostAllKar();
