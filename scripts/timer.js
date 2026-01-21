import { data } from "./data.js";
import { loadData } from "./script.js";

export let isTimer = true;
let isTimerOn = null;

document
  .querySelector(".main__input--startbutton")
  .addEventListener("click", choose);
document
  .querySelector(".main__input--manualbutton")
  .addEventListener("click", () => {
    isTimer = false;
  });
document
  .querySelector(".main__input--timerbutton")
  .addEventListener("click", () => {
    isTimer = true;
  });

function choose() {
  if (isTimer) startTimer();
  else {
    addTaskManual();
  }
}

function startTimer() {
  if (isTimerOn != null) {
    const timeDiff = Date.now() - isTimerOn;
    console.log(formatDurationFromMillis(timeDiff));
    document.querySelector(".main__input--stopwatch").textContent = "00:00:00";
    document
      .querySelector(".main__input--startbutton")
      .classList.remove("main__input--stopbutton");
    addTaskTimer();
  } else {
    setInterval(() => {
      document.querySelector(".main__input--stopwatch").textContent =
        formatDurationFromMillis(Date.now() - isTimerOn);
    }, 1000);
    document
      .querySelector(".main__input--startbutton")
      .classList.add("main__input--stopbutton");
    isTimerOn = Date.now();
  }
}

function addTaskTimer() {
  const timeInSeconds =Math.round((Date.now() - isTimerOn) / 1000);
  const taskNameInput = document.querySelector(".main__input--task");
  const date = new Date().toISOString().split("T")[0];
  const weekStart = getWeekStartSunday(date);
  const taskName = taskNameInput?.value.trim() || "";

  const taskObject = {
    id: Date.now(),
    date,
    taskStart: "10:48",
    taskEnd: "10:48",
    durationSeconds: timeInSeconds,
    duration: formatDuration(timeInSeconds),
  };

  console.log(taskObject)

  if (!data[weekStart]) data[weekStart] = {};
  if (!data[weekStart][taskName]) data[weekStart][taskName] = [];

  data[weekStart][taskName].push(taskObject);
  isTimerOn = null;
  loadData();
}

function addTaskManual() {
  console.log("data");
  const taskNameInput = document.querySelector(".main__input--task");
  const timeInputs = document.querySelectorAll(".main__input--time");
  const dateInput = document.querySelector(".main__input--date");
  const taskName = taskNameInput?.value.trim() || "";

  const taskStart = timeInputs[0].value;
  const taskEnd = timeInputs[1].value;

  const taskDate = dateInput.value || new Date().toISOString().split("T")[0];

  const startSeconds = timeToSeconds(taskStart);
  const endSeconds = timeToSeconds(taskEnd);
  const weekStart = getWeekStartSunday(taskDate);

  const diffSeconds = endSeconds - startSeconds;

  const taskObject = {
    id: Date.now(),
    date: taskDate,
    taskStart,
    taskEnd,
    durationSeconds: diffSeconds,
    duration: formatDuration(diffSeconds),
  };

  if (!data[weekStart]) data[weekStart] = {};
  if (!data[weekStart][taskName]) data[weekStart][taskName] = [];

  data[weekStart][taskName].push(taskObject);

  console.log(data);
  loadData();
}

export function getWeekStartSunday(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sunday
  date.setDate(date.getDate() - day);
  return date.toISOString().split("T")[0];
}

function timeToSeconds(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 3600 + m * 60;
}

function formatDuration(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatDurationFromMillis(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}
