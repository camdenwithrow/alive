"use strict";

const alive = document.querySelector(".alive");
const checkin = document.querySelector("#checkin-time");

fetch("https://checkoncam.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => {
    const feeling = data.feeling;
    const emoji = data.emoji;
    const gif = data.gif;

    const lastTime = new Date(data.lastUpdated);

    let lastCheckIn = lastTime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    checkin.innerHTML = lastCheckIn;

    alive.innerHTML = aliveStuff.text;
    alive.style.color = aliveStuff.color;
  });
