const colorSelects = document.querySelectorAll(".colorSelect");
const inputName = document.getElementById("inputName");
const chartName = document.getElementById("chartName");
const typeSelect = document.getElementById("typeSelect");
const selectedColors = new Set();
let label = [];
let data = [];
let color = [];
let myChart;
const colorsNames = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Cyan",
  "Magenta",
  "Teal",
  "Indigo",
  "Lime",
  "Gold",
  "Silver",
  "Coral",
  "Lavender",
  "Maroon",
  "Navy",
  "Turquoise",
  "Olive",
  "Salmon",
  "Plum",
  "Sky Blue",
  "Ivory",
  "Slate Gray",
  "Mint Green",
  "Crimson",
  "Orchid",
  "Azure",
  "Ruby",
  "Rose",
  "Tangerine",
  "Midnight Blue",
  "Peach",
  "Sea Green",
  "Tan",
  "Steel Blue",
  "Forest Green",
  "Tomato",
  "Cornflower Blue",
  "Papaya",
  "Cornsilk",
  "Orchid",
  "Aquamarine",
  "Thistle",
  "Dark Orange",
  "Sandy Brown",
  "Powder Blue",
  "Chocolate",
  "Medium Violet Red",
];

function createColorOption(colorSelect) {
  colorsNames.forEach((color) => {
    if (!selectedColors.has(color.toLowerCase().replace(/\s+/g, ""))) {
      const colorOption = document.createElement("option");
      colorOption.value = color.toLowerCase().replace(/\s+/g, "");
      colorOption.textContent = color;
      colorSelect.appendChild(colorOption);
    }
  });
}
for (let i = 0; i < colorSelects.length; i++) {
  colorSelects[i].addEventListener("change", function () {
    const selectedColor = this.value;
    if (selectedColor) {
      selectedColors.add(selectedColor);
      updateColorOptions();
    }
  });
}

function addInputSet() {
  if (typeSelect.value === "pie" || typeSelect.value === "doughnut") {
    const inputSets = document.querySelectorAll(".input-set");
    if (inputSets.length < 50) {
      const inputSet = document.createElement("div");
      inputSet.classList.add(
        "input-set",
        "justify-content-center",
        "row",
        "mb-3"
      );

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("col-md-4", "mb-3", "col-sm-12");

      const nameLabel = document.createElement("label");
      nameLabel.setAttribute("for", "textInput");
      nameLabel.textContent = "Name OF Data";
      const nameInput = document.createElement("input");
      nameInput.setAttribute("type", "text");
      nameInput.classList.add("textInput", "outline-dark", "form-control");
      nameInput.setAttribute("required", "");
      nameInput.setAttribute("placeholder", "Data Name");
      nameDiv.appendChild(nameLabel);
      nameDiv.appendChild(nameInput);
      inputSet.appendChild(nameDiv);

      const dataDiv = document.createElement("div");
      dataDiv.classList.add("col-md-3");
      dataDiv.classList.add("col-sm-12");
      dataDiv.classList.add("mb-3");
      const dataLabel = document.createElement("label");
      dataLabel.setAttribute("for", "numberInput");
      dataLabel.textContent = "Data";
      const dataInput = document.createElement("input");
      dataInput.setAttribute("type", "number");
      dataInput.classList.add("numberInput");
      dataInput.classList.add("form-control");
      dataInput.classList.add("outline-dark");
      dataInput.setAttribute("required", "");
      dataInput.setAttribute("placeholder", "Data");
      dataDiv.appendChild(dataLabel);
      dataDiv.appendChild(dataInput);
      inputSet.appendChild(dataDiv);

      const colorDiv = document.createElement("div");
      colorDiv.classList.add("col-md-3");
      colorDiv.classList.add("col-sm-12");
      colorDiv.classList.add("mb-3");
      const colorLabel = document.createElement("label");
      colorLabel.setAttribute("for", "colorSelect");
      colorLabel.textContent = "Select a color:";
      const colorSelect = document.createElement("select");
      colorSelect.classList.add("colorSelect");
      colorSelect.classList.add("form-select");
      colorSelect.classList.add("outline-dark");
      const colorOption = document.createElement("option");
      colorOption.value = "";
      colorOption.disabled = true;
      colorOption.selected = true;
      colorOption.textContent = "Select a color";
      colorSelect.appendChild(colorOption);
      colorDiv.appendChild(colorLabel);
      colorDiv.appendChild(colorSelect);
      inputSet.appendChild(colorDiv);

      const deleteButtonDiv = document.createElement("div");
      deleteButtonDiv.classList.add("col-md-2");
      deleteButtonDiv.classList.add("col-sm-12");
      deleteButtonDiv.classList.add("pt-4");
      const deleteLabel = document.createElement("label");
      deleteLabel.setAttribute("for", "colorSelect");
      deleteLabel.textContent = "Delete Data";
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("btn");
      deleteButton.classList.add("btn-outline-dark");
      deleteButton.classList.add("form-control");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        this.closest(".input-set").remove();
      };
      deleteButtonDiv.appendChild(deleteButton);
      inputSet.appendChild(deleteButtonDiv);

      createColorOption(colorSelect);
      colorSelect.addEventListener("change", () => {
        const selectedColor = colorSelect.value;
        if (selectedColor) {
          selectedColors.add(selectedColor);
          createColorOption(colorSelect);
        }
      });

      document.getElementById("inputSetContainer").appendChild(inputSet);
    } else {
      alert("Maximum limit reached. You can add up to 50 Data For Graphs.");
    }
  } else if (typeSelect.value === "line") {
    // Create input elements for a new dataset
    const datasetContainer = document.createElement("div");
    datasetContainer.classList.add(
      "dataset-container",
      "mb-3",
      "justify-content-center",
      "row"
    );

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("col-md-3", "mb-3", "col-sm-12");
    const label1 = document.createElement("label");
    label1.textContent = "Dataset Label";
    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.classList.add("form-control", "dataset-label");
    labelInput.placeholder = "Dataset Label";
    labelInput.required = true;
    nameDiv.appendChild(label1);
    nameDiv.appendChild(labelInput);

    const dataDiv = document.createElement("div");
    dataDiv.classList.add("col-md-4", "mb-3", "col-sm-12");
    const label2 = document.createElement("label");
    label2.textContent = "Data Points";
    const dataInput = document.createElement("input");
    dataInput.type = "text";
    dataInput.classList.add("form-control", "dataset-data");
    dataInput.placeholder = "10, 20, 15, 30, 25, 35";
    dataInput.required = true;
    dataDiv.appendChild(label2);
    dataDiv.appendChild(dataInput);

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("col-md-1", "mb-3", "col-sm-3");
    const label3 = document.createElement("label");
    label3.textContent = "color:";
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.classList.add("form-control", "color-input");
    colorInput.value = "#000000";
    colorDiv.appendChild(label3);
    colorDiv.appendChild(colorInput);

    const deleteButtonDiv = document.createElement("div");
    deleteButtonDiv.classList.add("col-md-2");
    deleteButtonDiv.classList.add("col-sm-12");
    deleteButtonDiv.classList.add("pt-4");
    const deleteLabel = document.createElement("label");
    deleteLabel.setAttribute("for", "colorSelect");
    deleteLabel.textContent = "Delete Data";
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-outline-dark");
    deleteButton.classList.add("form-control");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      this.closest(".dataset-container").remove();
    };
    deleteButtonDiv.appendChild(deleteButton);
    datasetContainer.appendChild(nameDiv);
    datasetContainer.appendChild(dataDiv);
    datasetContainer.appendChild(colorDiv);
    datasetContainer.appendChild(deleteButtonDiv);

    document.getElementById("inputSetContainer").appendChild(datasetContainer);
  }
}

// on change of type option in different type of chart it will change the data input option
typeSelect.addEventListener("change", function () {
  // Clear existing input sets
  const inputSetContainer = document.getElementById("inputSetContainer");
  inputSetContainer.innerHTML = "";
  const additionalInputsContainer = document.getElementById("additionalInputsContainer");
  additionalInputsContainer.innerHTML = ""; // Clear existing additional inputs

  if (typeSelect.value === "line") {
    // Create input elements for custom labels and number of data points
    const inputLabelsDiv = document.createElement("div");
    inputLabelsDiv.classList.add("mb-3");
    const inputLabelsLabel = document.createElement("label");
    inputLabelsLabel.setAttribute("for", "inputLabels");
    inputLabelsLabel.textContent = "Custom Labels (comma-separated):";
    const inputLabelsInput = document.createElement("input");
    inputLabelsInput.setAttribute("type", "text");
    inputLabelsInput.classList.add("form-control");
    inputLabelsInput.setAttribute("id", "inputLabels");
    inputLabelsInput.setAttribute(
      "placeholder",
      "January, February, March, April, May, June"
    );
    inputLabelsDiv.appendChild(inputLabelsLabel);
    inputLabelsDiv.appendChild(inputLabelsInput);

    const numDataPointsDiv = document.createElement("div");
    numDataPointsDiv.classList.add("mb-3");
    const numDataPointsLabel = document.createElement("label");
    numDataPointsLabel.setAttribute("for", "numDataPoints");
    numDataPointsLabel.textContent = "Number of Data Points:";
    const numDataPointsInput = document.createElement("input");
    numDataPointsInput.setAttribute("type", "number");
    numDataPointsInput.classList.add("form-control");
    numDataPointsInput.setAttribute("id", "numDataPoints");
    numDataPointsInput.setAttribute("min", "1");
    numDataPointsInput.setAttribute("value", "6");
    numDataPointsDiv.appendChild(numDataPointsLabel);
    numDataPointsDiv.appendChild(numDataPointsInput);

    additionalInputsContainer.appendChild(inputLabelsDiv);
    additionalInputsContainer.appendChild(numDataPointsDiv);
    const datasetContainer = document.createElement("div");
    datasetContainer.classList.add(
      "dataset-container",
      "mb-3",
      "justify-content-center",
      "row"
    );

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("col-md-3", "mb-3", "col-sm-12");
    const label1 = document.createElement("label");
    label1.textContent = "Dataset Label";
    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.classList.add("form-control", "dataset-label");
    labelInput.placeholder = "Dataset 1";
    labelInput.required = true;
    nameDiv.appendChild(label1);
    nameDiv.appendChild(labelInput);

    const dataDiv = document.createElement("div");
    dataDiv.classList.add("col-md-4", "mb-3", "col-sm-12");
    const label2 = document.createElement("label");
    label2.textContent = "Data Points";
    const dataInput = document.createElement("input");
    dataInput.type = "text";
    dataInput.classList.add("form-control", "dataset-data");
    dataInput.placeholder = "10, 20, 15, 30, 25, 35";
    dataInput.required = true;
    dataDiv.appendChild(label2);
    dataDiv.appendChild(dataInput);

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("col-md-1", "mb-3", "col-sm-3");
    const label3 = document.createElement("label");
    label3.textContent = "color:";
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.classList.add("form-control", "color-input");
    colorInput.value = "#43AE00";
    colorDiv.appendChild(label3);
    colorDiv.appendChild(colorInput);

    const deleteButtonDiv = document.createElement("div");
    deleteButtonDiv.classList.add("col-md-2");
    deleteButtonDiv.classList.add("col-sm-12");
    deleteButtonDiv.classList.add("pt-4");
    const deleteLabel = document.createElement("label");
    deleteLabel.setAttribute("for", "colorSelect");
    deleteLabel.textContent = "Delete Data";
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-outline-dark");
    deleteButton.classList.add("form-control");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      this.closest(".dataset-container").remove();
    };
    deleteButtonDiv.appendChild(deleteButton);
    datasetContainer.appendChild(nameDiv);
    datasetContainer.appendChild(dataDiv);
    datasetContainer.appendChild(colorDiv);
    datasetContainer.appendChild(deleteButtonDiv);

    document.getElementById("inputSetContainer").appendChild(datasetContainer);
    addInputSet();


    // Sample data for the area chart
    const labels = ["January", "February", "March", "April", "May", "June"];
    const dataset1 = {
      label: "Dataset 1",
      data: [10, 20, 15, 30, 25, 35],
      backgroundColor: "rgba(75, 192, 1, 1)", // Fill color for the area under the curve
      borderColor: "rgba(75, 192, 1, 0.5)", // Border color of the curve
      borderWidth: 2, // Width of the curve's border
    };

    const dataset2 = {
      label: "Dataset 2",
      data: [5, 15, 25, 20, 10, 50],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    };

    // Create the area chart
    myChart = new Chart(document.getElementById("chart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [dataset1, dataset2],
      },
      options: {
        title: {
          display: true,
          text: "Area Chart Example",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  } else {
    addInputSet();
  }
});



// Function to get the datasets from the input fields
function getDatasetsFromInputs() {
  const datasetContainers = document.querySelectorAll(".dataset-container");
  const datasets = [];

  datasetContainers.forEach((container) => {
    const label = container.querySelector(".dataset-label").value;
    const dataStr = container.querySelector(".dataset-data").value;
    const data = dataStr.split(",").map(Number);
    const color = container.querySelector(".color-input").value;

    datasets.push({
      label: label,
      data: data,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
      fill: false,
    });
  });

  return datasets;
}


function getData() {
  const inputSets = document.querySelectorAll(".input-set");
  chartName.textContent = inputName.value;

  if (typeSelect.value === "line") {
    const datasets = getDatasetsFromInputs();
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(document.getElementById("chart"), {
      type: "line",
      data: {
        labels: inputLabels.value.split(",").map(label => label.trim()),
        datasets: datasets,
      },
      options: {
        title: {
          display: true,
          text: "Area Chart Example",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  if (typeSelect.value === "pie" || typeSelect.value === "doughnut") {


    label = [];
    data = [];
    color = [];
    inputSets.forEach((inputSet) => {
      const textInputValue = inputSet.querySelector(".textInput").value;
      const numberInputValue = inputSet.querySelector(".numberInput").value;
      const selectOptionValue = inputSet.querySelector(".colorSelect").value;

      label.push(textInputValue);
      data.push(Number(numberInputValue));
      color.push(selectOptionValue);
    });

    console.log("Array 1:", label);
    console.log("Array 2:", data);
    console.log("Array 3:", color);

    chartName.textContent = inputName.value;

    // If the chart already exists, update it with new data
    if (myChart) {
      myChart.data.labels = label;
      myChart.data.datasets[0].data = data;
      myChart.data.datasets[0].backgroundColor = color;
      myChart.update();
    } else {
      // If the chart doesn't exist, create a new one
      myChart = new Chart(document.getElementById("chart"), {
        type: typeSelect.value,
        data: {
          labels: label,
          datasets: [
            {
              backgroundColor: color,
              data: data,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Pie Chart for admin panel",
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
}


function downloadChartImage() {
  // Get the canvas element
  const canvas = document.getElementById("chart");

  // Convert the canvas content into a Blob
  canvas.toBlob((blob) => {
    // Create a download link
    const link = document.createElement("a");
    link.download = `${inputName.value}.png`; // Set the file name
    link.href = URL.createObjectURL(blob); // Set the Blob as the link's href
    link.click(); // Trigger the download
  });
}