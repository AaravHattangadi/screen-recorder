// Dependencies
const { desktopCapturer, remote } = require("electron");
const { Menu } = remote;

// Referencing the buttons
const videoElement = document.querySelector("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");

videoSelectBtn.onclick = getVideoSources;

// Getting the video sources

async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map((source) => {
      return {
        label: source.name,
        click: () => selectSource(),
      };
    })
  );

  videoOptionsMenu.popup();
}

//Channge the video source window to record
async function selectSource(source) {
  //ideoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };
// create a stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  //preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play();
}
