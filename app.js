const alertBanner = document.getElementById("alert");
const bellAlerts = document.getElementsByClassName("bell")[0];
const [notificationList] = document.getElementsByClassName("notification-list");
const notificationsList = document.querySelectorAll(".notification-list div");
notificationList.style.display = "none";

bellAlerts.addEventListener("click", () => {
  if (notificationList.style.display === "grid") {
    notificationList.style.display = "none";
  } else {
    notificationList.style.display = "grid";
  }
});

// create the html for the banner
alertBanner.innerHTML = `<div class="alert-banner">
    <p>
      <strong>Alert:</strong> You have <strong class="number-banner">${notificationsList.length}</strong> overdue tasks to complete
    </p>
    <p class="alert-banner-close">x</p>
  </div>`;

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

notificationsList.forEach((notification) => {
  notification.addEventListener("click", (e) => {
    const element = e.target;
    if (element.classList.contains("close")) {
      notification.remove();
      const [notificationNumber] = document.getElementsByClassName("notification");
      const currentValue = parseInt(notificationNumber.innerHTML);
      notificationNumber.innerText = currentValue - 1;
      if (currentValue === 1) {
        notificationNumber.style.display = "none";
      }

      const [banerNumber] = document.getElementsByClassName("number-banner");
      banerNumber.innerHTML = currentValue - 1;
    }
  });
});

const trafficCanvas = document.getElementById("traffic-chart");

const getData = (e, type) => {
  //get list of buttons
  const buttons = document.querySelectorAll(".traffic-nav-link");

  buttons.forEach((ceva) => {
    ceva.classList.remove("active");
  });
  //loop trough buttons
  //clear class .active from all

  switch (type) {
    case "Hourly":
      trafficChart.config.data = dataHourly;
      e.target.classList.add("active");
      break;
    case "Daily":
      trafficChart.config.data = dataDaily;
      e.target.classList.add("active");
      break;
    case "Weekly":
      trafficChart.config.data = dataWeekly;
      e.target.classList.add("active");
      break;
    case "Monthly":
      trafficChart.config.data = dataMonthly;
      e.target.classList.add("active");
      break;
    default:
      break;
  }

  trafficChart.update();
};

document.getElementById("Hourly").addEventListener("click", (e) => getData(e, "Hourly"));
document.getElementById("Daily").addEventListener("click", (e) => getData(e, "Daily"));
document.getElementById("Weekly").addEventListener("click", (e) => getData(e, "Weekly"));
document.getElementById("Monthly").addEventListener("click", (e) => getData(e, "Monthly"));

let trafficOptions = {
  backgroundColor: "rgba(112, 104, 201, .5)",
  fill: true,
  maintainAspectRatio: false,
  // aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: dataHourly,
  options: trafficOptions,
});

const dailyCanvas = document.getElementById("daily-chart");
// data for daily traffic bar chart
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: "#7477BF",
      borderWidth: 1,
    },
  ],
};
const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions,
});

const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "# of Users",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"],
    },
  ],
};

const mobileOptions = {
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 20,
        fontStyle: "bold",
      },
    },
  },
};
let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions,
});

const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener("click", () => {
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
  } else if (message.value === "") {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});
