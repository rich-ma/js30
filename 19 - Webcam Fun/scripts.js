const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

//start my code
function getVideo(){
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then( localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch( err => {
      console.error('Please allow access to camera to use this application', err); 
    })
};

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    //mess with them
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.5;

    //put pixels back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto(){
  //play the sound
  snap.currentTime = 0;
  snap.play();

  //capture the image
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src=${data} alt='handsome pic' />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
  for (let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i] += 100 // red
    pixels.data[i + 1] -= 50 // greed
    pixels.data[i + 2] *= 0.5// blue
  };
  return pixels;
};

function rgbSplit(pixels){
   for (let i = 0; i < pixels.data.length; i += 4) {
     pixels.data[i + 200] = pixels.data[i] // red
     pixels.data[i + 100] = pixels.data[i + 1] // greed
     pixels.data[i - 150] = pixels.data[i + 2] // blue
   };
   return pixels;
}

function greenScreen(pixels){

}

getVideo();

video.addEventListener('canplay', paintToCanvas);
