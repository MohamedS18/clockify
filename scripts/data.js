export const data = {
  "2026-01-18": {
    "Design": [
      {
        id: 1768976892639,
        date: "2026-01-21",
        taskStart: "01:30",
        taskEnd: "02:20",
        durationSeconds: 3000,
        duration: "00:50:00"
      },
      {
        id: 1768977892640,
        date: "2026-01-22",
        taskStart: "03:00",
        taskEnd: "04:15",
        durationSeconds: 4500,
        duration: "01:15:00"
      }
    ],
    "Development": [
      {
        id: 1768978892641,
        date: "2026-01-23",
        taskStart: "10:00",
        taskEnd: "12:30",
        durationSeconds: 9000,
        duration: "02:30:00"
      }
    ]
  },

  "2026-01-25": {
    "Meeting": [
      {
        id: 1768986892642,
        date: "2026-01-26",
        taskStart: "09:00",
        taskEnd: "09:45",
        durationSeconds: 2700,
        duration: "00:45:00"
      }
    ],
    "Research": [
      {
        id: 1768987892643,
        date: "2026-01-27",
        taskStart: "14:10",
        taskEnd: "16:40",
        durationSeconds: 9000,
        duration: "02:30:00"
      },
      {
        id: 1768987892649,
        date: "2026-01-27",
        taskStart: "14:10",
        taskEnd: "16:40",
        durationSeconds: 9000,
        duration: "02:30:00"
      },
      {
        id: 1768988892644,
        date: "2026-01-29",
        taskStart: "11:00",
        taskEnd: "12:00",
        durationSeconds: 3600,
        duration: "01:00:00"
      }
    ]
  }
};

// localStorage.setItem("value", JSON.stringify(data));

export function getData() {
  return JSON.parse(localStorage.getItem("value"));
}

export function saveData(data) {
  localStorage.setItem("value", JSON.stringify(data));
}