import { getData, saveData } from "./data.js";
import { loadData } from "./script.js";
import { getWeekStartSunday } from "./timer.js";

document.querySelector(".navbar__showmore").addEventListener("click", showMore);
document
  .querySelector(".main__input--manualbutton")
  .addEventListener("click", enableManualDate);
document
  .querySelector(".main__input--timerbutton")
  .addEventListener("click", enableTimer);

document
  .querySelector(".main__input--date")
  .addEventListener("change", showDate);

document.querySelectorAll(".main__task--moreicon").forEach((icon) => {
  icon.addEventListener("click", showDelete);
});

document.addEventListener("click", () => {
  document
    .querySelectorAll(".main__task--morecontainer.show")
    .forEach((menu) => menu.classList.remove("show"));
});

document.querySelectorAll(".main__task--deletebutton").forEach((icon) => {
  icon.addEventListener("click", deleteTask);
});

document.querySelectorAll(".main__task--duplicatebutton").forEach((icon) => {
  icon.addEventListener("click", duplicateTask);
});

document.querySelectorAll(".main__task--date").forEach((icon) => {
  icon.addEventListener("change", changeDate);
});

document
  .querySelector(".navbar__minimise")
  .addEventListener("click", minimiseNavbar);

document.querySelectorAll(".main__task--count").forEach((icon) => {
  icon.addEventListener("click", showSubTask);
});

let toShowMore = false;
let toMinimiseNavbar = false;
let toShowSubtask = false;
enableTimer();

function showMore() {
  toShowMore = !toShowMore;
  if (toShowMore) {
    document.querySelector(".navbar__item--showmore").innerHTML = "SHOW LESS";
    document.querySelector(".showmoreimage").innerHTML =
      `<img src="https://app.clockify.me/assets/ui-icons/chevron-up.svg">`;
    document.querySelector(".navbar__section--showmore").innerHTML = `
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/projects.svg" />
          </div>
          <div class="navbar__item--title">PROJECTS</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/teams.svg" />
          </div>
          <div class="navbar__item--title">TEAM</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/clients.svg" />
          </div>
          <div class="navbar__item--title">CLIENTS</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/tags.svg" />
          </div>
          <div class="navbar__item--title">TAGS</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/projects.svg" />
          </div>
          <div class="navbar__item--title">PROJECTS</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/teams.svg" />
          </div>
          <div class="navbar__item--title">TEAM</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/clients.svg" />
          </div>
          <div class="navbar__item--title">CLIENTS</div>
        </div>
        <div class="navbar__section--item">
          <div class="navbar__item--image">
            <img src="https://app.clockify.me/assets/nav-icons/tags.svg" />
          </div>
          <div class="navbar__item--title">TAGS</div>
        </div>
      `;
  } else {
    document.querySelector(".showmoreimage").innerHTML =
      `<img src="https://app.clockify.me/assets/ui-icons/chevron-down.svg">`;
    document.querySelector(".navbar__item--showmore").innerHTML = "SHOW MORE";
    document.querySelector(".navbar__section--showmore").innerHTML = "";
  }
}

function enableTimer() {
  document.querySelector(".main__input--right").classList.add("manual");
  document.querySelector(".main__input--datecontainer").classList.add("manual");
  document.querySelector(".main__input--task").classList.add("manual");
}

function enableManualDate() {
  document.querySelector(".main__input--right").classList.remove("manual");
  document.querySelector(".main__input--task").classList.remove("manual");
  document
    .querySelector(".main__input--datecontainer")
    .classList.remove("manual");
}

export function showDate() {
  const dateInput = document.querySelector(".main__input--date");
  const output = document.querySelector(".main__date--show");
  const date = new Date(dateInput.value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  output.textContent = `${month}/${day}/${year}`;
}

function showDelete(e) {
  e.stopPropagation();
  const menu = e.currentTarget.querySelector(".main__task--morecontainer");
  menu.classList.add("show");
}

function deleteTask(e) {
  let data = getData();
  const dataset = e.currentTarget.dataset;

  if (dataset.date) {
    const weekStart = getWeekStartSunday(e.currentTarget.dataset.date);

    data[weekStart][dataset.id] = data[weekStart][dataset.id].filter((item) => {
      return item.date !== dataset.date;
    });
  } else {
    for (const week in data) {
      for (const task in data[week]) {
        data[week][task] = data[week][task].filter(
          (item) => item.id != dataset.id,
        );
      }
    }
  }

  for (const week in data) {
    for (const task in data[week]) {
      if (data[week][task].length == 0) {
        delete data[week][task];
      }
    }
    if (Object.keys(data[week]).length === 0) {
      delete data[week];
    }
  }

  saveData(data);
  loadData();
  refresh();
}

export function refresh() {
  document.querySelectorAll(".main__task--moreicon").forEach((icon) => {
    icon.addEventListener("click", showDelete);
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".main__task--morecontainer.show")
      .forEach((menu) => menu.classList.remove("show"));
  });

  document.querySelectorAll(".main__task--deletebutton").forEach((icon) => {
    icon.addEventListener("click", deleteTask);
  });

  document.querySelectorAll(".main__task--duplicatebutton").forEach((icon) => {
    icon.addEventListener("click", duplicateTask);
  });
  document.querySelectorAll(".main__task--count").forEach((icon) => {
    icon.addEventListener("click", showSubTask);
  });

  document.querySelectorAll(".main__task--date").forEach((icon) => {
    icon.addEventListener("change", changeDate);
  });
}

function duplicateTask(e) {
  let data = getData();
  const dataset = e.currentTarget.dataset;
  let dataToDuplicate = null;
  let taskName = null;

  if (dataset.date) {
    const weekStart = getWeekStartSunday(e.currentTarget.dataset.date);
    taskName = dataset.id;
    data[weekStart][dataset.id].forEach((item) => {
      if (dataToDuplicate == null && item.date == dataset.date) {
        dataToDuplicate = item;
      }
    });
  } else {
    for (const week in data) {
      for (const task in data[week]) {
        data[week][task].forEach((item) => {
          if (item.id == dataset.id) {
            taskName = task;
            dataToDuplicate = item;
          }
        });
      }
    }
  }
  dataToDuplicate = { ...dataToDuplicate };
  dataToDuplicate.id = Date.now();
  const week = getWeekStartSunday(dataToDuplicate.date);
  data[week][taskName].push(dataToDuplicate);
  saveData(data);
  loadData();
  refresh();
}

function minimiseNavbar() {
  toMinimiseNavbar = !toMinimiseNavbar;
  if (toMinimiseNavbar) {
    document.querySelectorAll(".navbar__item--title").forEach((elem) => {
      elem.classList.add("display-none");
    });
    document.querySelectorAll(".navbar__section--title").forEach((elem) => {
      elem.classList.add("display-none");
    });
    document
      .querySelector(".navbar__item--showmore")
      .classList.add("display-none");
    document.querySelector(".navbar").classList.add("minimise");
    document.querySelector(".navbar__minimise").classList.add("minimise");
    document.querySelector(".main").classList.add("expand");
    document.querySelector(".main__input").classList.add("expand");
  } else {
    document.querySelectorAll(".navbar__item--title").forEach((elem) => {
      elem.classList.remove("display-none");
    });
    document.querySelectorAll(".navbar__section--title").forEach((elem) => {
      elem.classList.remove("display-none");
    });
    document
      .querySelector(".navbar__item--showmore")
      .classList.remove("display-none");
    document.querySelector(".navbar").classList.remove("minimise");
    document.querySelector(".navbar__minimise").classList.remove("minimise");
    document.querySelector(".main").classList.remove("expand");
    document.querySelector(".main__input").classList.remove("expand");
  }
}

function showSubTask() {
  toShowSubtask = !toShowSubtask;

  if (toShowSubtask) {
    document.querySelectorAll(".subtask").forEach((elem) => {
      elem.classList.add("hide");
    });
  } else {
    document.querySelectorAll(".subtask").forEach((elem) => {
      elem.classList.remove("hide");
    });
  }
}

function changeDate(e) {
  let dataToChange = null;
  let data = getData();
  const { id } = e.currentTarget.dataset;
  const newDate = e.currentTarget.value;
  for (const week in data) {
    for (const task in data[week]) {
      data[week][task].forEach((item) => {
        if (item.id == id) {
          dataToChange = item;
        }
      });
    }
  }
  dataToChange.date = newDate;

  saveData(data);
  loadData();
  refresh();
}
