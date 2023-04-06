import fs from 'fs';
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Canvas, loadImage } from 'canvas';
import {stitchFramesToVideo} from './create-file-video.js'

// Clean up the temporary directories first
for (const path of ['out', 'tmp/output']) {
  if (fs.existsSync(path)) {
    await fs.promises.rm(path, { recursive: true });
  }
  await fs.promises.mkdir(path, { recursive: true });
}

export async function createMasterVideo (data){

  // Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

let logos = []
// Duração de cada imagem em segundos
let logoDurations = [];
let duration = 0;
let timerLogo = [];

for (let index = 0; index < data.length; index++) {
   logos[index] = await loadImage(data[index]);
  logoDurations[index] = 10
  timerLogo[index] = duration + 10;
  duration = duration + 10;
}



const canvas = new Canvas(1280, 720);
const context = canvas.getContext('2d');

// The video length and frame rate, as well as the number of frames required
// to create the video

const frameRate = 2;
const frameCount = Math.floor(duration * frameRate);



// Store the images in an array

let currentLogoIndex = 0;

for (let i = 0; i < frameCount; i++) {

  const time = i / frameRate;

  console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`);

  let seconds = Math.round(time * 10) / 10;
  // Clear the canvas with a white background color. This is required as we are
  // reusing the canvas with every frame
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Render the current image
  if(timerLogo[currentLogoIndex] < seconds){
    currentLogoIndex++;
  }
  const logoDuration = logoDurations[currentLogoIndex];
  renderFrame(context, logoDuration, time, logos[currentLogoIndex], seconds, canvas, logoDurations);

  // Store the image in the directory where it can be found by FFmpeg
  const output = canvas.toBuffer('image/png');
  const paddedNumber = String(i).padStart(4, '0');
  await fs.promises.writeFile(`tmp/output/frame-${paddedNumber}.png`, output);


}

// Stitch all frames together with FFmpeg
await stitchFramesToVideo(
  'tmp/output/frame-%04d.png',
  'assets/song.mp3',
  'out/video.mp4',
  duration,
  frameRate,
);

return "suceess";
}




function renderFrame(context, duration, time, logo, seconds, canvas, logoDurations) {

  // Calculate the progress of the animation from 0 to 1
  let t = time / duration;

  // Apply Cubic easing, see https://easings.net/#easeInOutCubic
  t = applyCubicInOutEasing(t);

  // Draw the current image to cover the whole canvas
  context.drawImage(logo, 0, 0, canvas.width, canvas.height);

  // Draw the text in white color at the top of the canvas
  context.textAlign = 'center';
  let fontSize = canvas.width / 50; // Set the font size based on the canvas width
  context.font = `${fontSize}px Arial`;
  context.fillStyle = '#FFFFFF';

  // Limit the text to fit within the canvas
  let maxLineWidth = canvas.width - 20;
  let text = (seconds < logoDurations[0]) ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of ";
  let lines = splitTextIntoLines(text, maxLineWidth, context);

  // Draw each line of the text
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], canvas.width / 2, fontSize + 20 + i * (fontSize + 5));
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