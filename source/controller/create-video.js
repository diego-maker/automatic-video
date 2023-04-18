import fs from 'fs';
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Canvas, loadImage } from 'canvas';
import { stitchFramesToVideo } from './create-file-video.js'
import reandingTime from '../readingTime.js';
import contexLanguage from '../controller/create-context.js';
import searchImages from './search-images-google.js';

// Clean up the temporary directories first
for (const path of ['out', 'tmp/output']) {
  if (fs.existsSync(path)) {
    await fs.promises.rm(path, { recursive: true });
  }
  await fs.promises.mkdir(path, { recursive: true });
}

export async function createMasterVideo(idioma, contextVideo, busca) { // CRIA A MAIN DO VIDEO, DEFINIMOS TEMPO DE VIDEO E QUANTIDADE DE IMAGENS AQUI

  let logos = []
  // // Duração de cada imagem em segundos
   let logoDurations = [];
   let duration = 0;
   let timerLogo = [];

  const contextMaker  = contextVideo
  let makerContext = 10 // limitando em 5 o contexto  do video

  for (let index = 0; index < makerContext; index++) {
   const timeTex =  reandingTime(contextMaker[index]);
 
   const searchImage = await contexLanguage(contextMaker[index]);

   console.log(searchImage.entities[0].text)
   let images = await searchImages(searchImage.entities[0].text,idioma,busca);
   logos[index] = await loadImage(images);
   console.log(`I found the image ${index} url ${images}`)
   logoDurations[index] = timeTex
   timerLogo[index] = duration + logoDurations[index];
   duration = duration + logoDurations[index];

   
  }


  //   // Tell fluent-ffmpeg where it can find FFmpeg
   ffmpeg.setFfmpegPath(ffmpegStatic);


   const canvas = new Canvas(1280, 720);
   const context = canvas.getContext('2d');

  // // The video length and frame rate, as well as the number of frames required
  // // to create the video

  const frameRate = 2;
  const frameCount = Math.floor(duration * frameRate);


  // // Store the images in an array

   let currentLogoIndex = 0;

   for (let i = 0; i < frameCount; i++) {

     const time = i / frameRate;

     console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`);

     let seconds = Math.round(time * 10) / 10;
  //   // Clear the canvas with a white background color. This is required as we are
  //   // reusing the canvas with every frame
     context.fillStyle = '#ffffff';
     context.fillRect(0, 0, canvas.width, canvas.height);

  //   // Render the current image
     if(timerLogo[currentLogoIndex] < seconds){
       currentLogoIndex++;
     }
     const logoDuration = logoDurations[currentLogoIndex];
     const textShow = contextMaker[currentLogoIndex]
     renderFrame(context, logoDuration, time, logos[currentLogoIndex], seconds, canvas, logoDurations, textShow);

  //   // Store the image in the directory where it can be found by FFmpeg
    const output = canvas.toBuffer('image/png');
    const paddedNumber = String(i).padStart(4, '0');
    await fs.promises.writeFile(`tmp/output/frame-${paddedNumber}.png`, output);


   }

  // // Stitch all frames together with FFmpeg
   await stitchFramesToVideo(
     'tmp/output/frame-%04d.png',
     'assets/song.mp3',
     'out/video.mp4',
     duration,
     frameRate,
   );

  return "suceess";

}


function renderFrame(context, duration, time, logo, seconds, canvas, logoDurations,textShow) {
  // Calculate the progress of the animation from 0 to 1
  let t = time / duration;

  // Apply Cubic easing, see https://easings.net/#easeInOutCubic
  t = applyCubicInOutEasing(t);

  // Set box height for text
  let boxHeight = canvas.height / 4;

  // Draw the current image to cover the whole canvas
  context.drawImage(logo, 0, 0, canvas.width, canvas.height);

  // Draw black box below the image
  context.fillStyle = '#000000';
  context.fillRect(0, canvas.height - boxHeight, canvas.width, boxHeight + 10);

  // Draw the text in white color inside the black box
  context.textAlign = 'center';
  let fontSize = canvas.width / 50;
  context.font = `${fontSize}px Arial`;
  context.fillStyle = '#FFFFFF';

  // Limit the text to fit within the canvas
  let maxLineWidth = canvas.width - 20;
  let text = textShow;
  
  let lines = splitTextIntoLines(text, maxLineWidth, context);

  // Draw each line of the text
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], canvas.width / 2, canvas.height - boxHeight + fontSize + 10 + i * (fontSize + 5));
  }
}


function applyCubicInOutEasing(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


function splitTextIntoLines(text, maxLineLength, context) {
  let words = text.split(' ');
  let lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let width = context.measureText(currentLine + ' ' + word).width;

    if (width > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }

  lines.push(currentLine.trim());

  return lines;
}