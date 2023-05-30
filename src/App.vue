<script setup>
  import { ref, onMounted } from "vue";
  import scannerAnimation from "./components/scannerAnimation.vue";
  import UrlPopup from "./components/UrlPopup.vue";
  // ES6 import
  import jsQR from "jsqr";

  // CommonJS require
  const scanEnabled = ref(true); // Add scanEnabled variable
  const qrData = ref("");
  const videoWidth = ref(0);
  const videoHeight = ref(0);

  onMounted(() => {
    // const jsQR = require("jsqr");
    const video = document.getElementById("video");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          facingMode: "environment", // Use 'environment' for rear camera
        },
      };

      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
          videoWidth.value = video.videoWidth;
          videoHeight.value = video.videoHeight;
          requestAnimationFrame(scanQRCode);
        };
      });
    }
  });

  function scanQRCode() {
    if (!scanEnabled.value) return; // Stop scanning if scanEnabled is false
    const canvas = document.createElement("canvas");
    canvas.width = videoWidth.value;
    canvas.height = videoHeight.value;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      if (code.data) {
        console.log("QR Code detected:", code);

        ShowPopup(code.data);
        scanEnabled.value = false; // Stop scanning when a QR code is detected
        // Handle the QR code data here
      }
    } else {
      requestAnimationFrame(scanQRCode);
    }
  }
  function ShowPopup(data) {
    if (!qrData.value) {
      qrData.value = data;
    }
  }
  function copyQrData() {
    copyToClipboard(qrData.value);
    qrData.value = "";
    scanEnabled.value = true;
    requestAnimationFrame(scanQRCode);
  }
  function copyToClipboard(text) {
    // Create a temporary input element
    const tempInput = document.createElement("input");

    // Set the input element's value to the desired text
    tempInput.value = text;

    // Append the input element to the DOM
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);
  }
</script>

<template>
  <div class="video-wrapper">
    <video align="center" id="video" width="100" height="100" autoplay></video>
  </div>
  <scannerAnimation></scannerAnimation>
  
  <UrlPopup
    v-show="qrData"
    @copy_text_event="copyQrData"
    :data="qrData"
  ></UrlPopup>
</template>

<style>

*{
  margin:0;
  padding:0;
}
.video-wrapper{
  width:100vw;
  height:100vh;
  box-sizing: border-box;
  overflow:hidden;
  /* border:30px solid green; */
}

#app{
  margin:0;
  padding:0;
  width:100%;
  height:100%;

}
video{

  background: #000;
  padding:0 0;
  display:block;
  width:100vw;
  border:solid 2px #000;
  border-radius:5;
  top:0px;
  left:0px;
  box-sizing: border-box;
  height:100%;
  object-fit: cover;

}


.cont{
 width:100%;
 height:100%;
}
</style>
