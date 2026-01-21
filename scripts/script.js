import { data } from "./data.js";

loadData();

export function loadData() {
  const container = document.querySelector(".main__tasks");

  container.innerHTML = Object.entries(data)
    .map(([weekStart, tasks]) => {
      // 🔹 Group ALL entries by date
      const days = {};

      Object.entries(tasks).forEach(([taskName, entries]) => {
        entries.forEach((e) => {
          if (!days[e.date]) days[e.date] = [];
          days[e.date].push({ taskName, ...e });
        });
      });

      const daysHTML = Object.entries(days)
        .map(([date, entries]) => {
          // day total
          const dayTotal = entries.reduce(
            (sum, e) => sum + e.durationSeconds,
            0,
          );

          // 🔹 group by task name INSIDE THE DAY
          const tasksByName = {};
          entries.forEach((e) => {
            if (!tasksByName[e.taskName]) {
              tasksByName[e.taskName] = [];
            }
            tasksByName[e.taskName].push(e);
          });

          const tasksHTML = Object.entries(tasksByName)
            .map(([taskName, taskEntries]) => {
              // ✅ SINGLE ENTRY → normal task
              if (taskEntries.length === 1) {
                const t = taskEntries[0];
                return `
<div class="main__task" data-id="${t.id}">
  <div class="main__task--left">
    <input class="main__task--input" value="${taskName}" data-id="${t.id}" />
  </div>

  <div class="main__task--right">
    <div class="main__dashed--border"></div>
    <div class="main__input--icon">
      <img src="https://app.clockify.me/assets/ui-icons/tag-gray.svg" />
    </div>
    <div class="main__dashed--border"></div>
    <div class="main__input--icon">$</div>
    <div class="main__dashed--border"></div>

    <div class="main__task--datecontainer">
      <input class="main__task--time" value="${t.taskStart}" data-id="${t.id}" />
      <div>-</div>
      <input class="main__task--time" value="${t.taskEnd}" data-id="${t.id}" />
      <input class="main__task--date" type="date" value="${t.date}" data-id="${t.id}" />
    </div>

    <div class="main__input--stopwatch">${t.duration}</div>

    <div class="main__input--icon">
                  <img src="https://app.clockify.me/assets/ui-icons/play.svg" />
                </div>
                <div class="main__task--moreicon">
                  <img
                    src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg"
                  />
                  <div class="main__task--morecontainer">
                    <button>Duplicate</button>
                    <button>Delete</button>
                  </div>
                </div>
  </div>
</div>`;
              }

              // ✅ MULTIPLE ENTRIES SAME DAY → parent + subtasks
              const totalSeconds = taskEntries.reduce(
                (sum, t) => sum + t.durationSeconds,
                0,
              );

              const parentHTML = `
<div class="main__task" data-id="${taskName}">
  <div class="main__task--left">
    <span class="main__task--count">${taskEntries.length}</span>
    <input class="main__task--input" value="${taskName}" data-id="${taskName}" />
  </div>

  <div class="main__task--right">
  <div class="main__dashed--border"></div>
                <div class="main__input--icon">
                  <img
                    src="https://app.clockify.me/assets/ui-icons/tag-gray.svg"
                  />
                </div>
                <div class="main__dashed--border"></div>
                <div class="main__input--icon">$</div>
                <div class="main__dashed--border"></div>
                <div class="main__task--datecontainer">
                  <input class="main__task--time" type="text" />
                  <div>-</div>
                  <input class="main__task--time" type="text" />
                  <input class="main__task--date" type="date" />
                </div>
    <div class="main__input--stopwatch">
      ${secondsToHMS(totalSeconds)}
    </div>

    <div class="main__input--icon">
                  <img src="https://app.clockify.me/assets/ui-icons/play.svg" />
                </div>
                <div class="main__task--moreicon">
                  <img
                    src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg"
                  />
                  <div class="main__task--morecontainer">
                    <button>Duplicate</button>
                    <button>Delete</button>
                  </div>
                </div>
  </div>
</div>`;

              const subtasksHTML = taskEntries
                .map(
                  (t) => `
<div class="main__task subtask" data-id="${t.id}">
  <div class="main__task--left">
    <input class="main__task--input" value="${taskName}" data-id="${t.id}" />
  </div>

  <div class="main__task--right">
    <div class="main__dashed--border"></div>
    <div class="main__input--icon">
      <img src="https://app.clockify.me/assets/ui-icons/tag-gray.svg" />
    </div>
    <div class="main__dashed--border"></div>
    <div class="main__input--icon">$</div>
    <div class="main__dashed--border"></div>

    <div class="main__task--datecontainer">
      <input class="main__task--time" value="${t.taskStart}" data-id="${t.id}" />
      <div>-</div>
      <input class="main__task--time" value="${t.taskEnd}" data-id="${t.id}" />
      <input class="main__task--date" type="date" value="${t.date}" data-id="${t.id}" />
    </div>

    <div class="main__input--stopwatch">${t.duration}</div>

    <div class="main__input--icon">
                  <img src="https://app.clockify.me/assets/ui-icons/play.svg" />
                </div>
                <div class="main__task--moreicon">
                  <img
                    src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg"
                  />
                  <div class="main__task--morecontainer">
                    <button>Duplicate</button>
                    <button>Delete</button>
                  </div>
                </div>
  </div>
</div>`,
                )
                .join("");

              return parentHTML + subtasksHTML;
            })
            .join("");

          return `
<div class="main__day" data-date="${date}">
  <div class="main__day--title">
    <div>${formatDayTitle(date)}</div>
    <div>total: ${secondsToHMS(dayTotal)}</div>
  </div>

  ${tasksHTML}

  <div class="main__day--bottom"></div>
</div>`;
        })
        .join("");

      return `
<div class="main__week" data-week="${weekStart}">
  <div class="main__week--title">
    ${formatWeekRange(weekStart)}
  </div>

  ${daysHTML}
</div>`;
    })
    .join("");
}

function secondsToHMS(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatWeekRange(weekStartStr) {
  const start = new Date(weekStartStr);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const opt = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", opt)} - ${end.toLocaleDateString("en-US", opt)}`;
}

function formatDayTitle(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
