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

document
  .querySelector(".main__input")
  .addEventListener("click", removeAllCustomStyle);


let toShowMore = false;
enableTimer();

function showMore() {
  toShowMore = !toShowMore;
  if (toShowMore) {
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

function showDate() {
  const dateInput = document.querySelector(".main__input--date");
  const output = document.querySelector(".main__date--show");
  const date = new Date(dateInput.value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  output.textContent = `${month}/${day}/${year}`;
}

function showDelete() {
  document.querySelector(".main__task--morecontainer").classList.add("show");
}

function removeAllCustomStyle() {
  document.querySelector(".main__task--morecontainer").classList.remove("show");
}

