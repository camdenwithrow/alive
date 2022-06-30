"use strict";

const alive = document.querySelector(".alive");
const checkin = document.querySelector("#checkin-time");

fetch("https://checkoncam.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => {
    let lastTime = new Date(data.lastUpdated);
    let now = new Date();

    let milliToHour = 1000 * 60 * 60;

    let hourDelta = (now - lastTime) / milliToHour;

    let lastCheckIn = lastTime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    checkin.innerHTML = lastCheckIn;

    let aliveStuff

    if(hourDelta <= 24) {
        aliveStuff = {text: "Alive :)", color: "#16a34a"}
    } else if(24 < hourDelta < 36) {
        aliveStuff = {text: "Alive", color: "#84cc16"}
    } else if(36 < hourDelta < 48) {
        aliveStuff = {text: "Alive??", color: "#eab308"}
    } else {
        aliveStuff = {text: "Maybe Check In?", color: "#ea580c"}
    }

    alive.innerHTML = aliveStuff.text;
    alive.style.color = aliveStuff.color

  });
