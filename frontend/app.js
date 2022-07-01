"use strict";

const gif = document.querySelector("#gif");
const feeling = document.querySelector(".feeling");
const emoji = document.querySelector("#emoji")
const checkin = document.querySelector("#checkin-time");

// fetch("https://checkoncam.herokuapp.com/")
fetch('https://checkoncam.herokuapp.com/')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    const feelingInput = data.feeling;
    const gifUrl = data.gif;
    const emo = data.emoji
    const lastTime = new Date(data.lastUpdated);

    let lastCheckIn = lastTime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    checkin.innerHTML = lastCheckIn;
    feeling.innerHTML = feelingInput;
    emoji.innerHTML = emo;
    gif.src = gifUrl;
  });
