const fs=require('fs');
const css=fs.readFileSync('src/styles.css','utf8');
const content=fs.readFileSync('src/content.js','utf8');
const illus=fs.readFileSync('src/illustrations.js','utf8');
const app=fs.readFileSync('src/app.js','utf8');
const js=content+"\n\n"+illus+"\n\n"+app;
const html=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<meta name="description" content="Little Readers: Read, Tap & Play — interactive reading comprehension for young ESL learners. Created by Bright EngMath.">
<meta name="author" content="Bright EngMath">
<title>Little Readers: Read, Tap &amp; Play · Bright EngMath</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%236FA06C'/%3E%3Cpath d='M32 14l6 13 14 1-10 9 3 14-13-7-13 7 3-14-10-9 14-1z' fill='%23F4C95D'/%3E%3C/svg%3E">
<style>
${css}
</style>
</head>
<body>
<div id="loader"><div class="l-inner">
  <div class="l-mark"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="#F4C95D"/><path d="M32 16 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1Z" fill="#fff"/></svg></div>
  <div style="font-family:'Baloo 2',system-ui,sans-serif;font-weight:800;color:#2F5D50;font-size:1.2rem;">Little Readers</div>
  <div style="color:#6C7B74;font-weight:700;font-size:.85rem;">Read, Tap &amp; Play · Bright EngMath</div>
  <div class="l-bar"><i></i></div>
</div></div>
<div id="app"></div>
<noscript><div style="max-width:640px;margin:60px auto;padding:24px;font-family:sans-serif;text-align:center;color:#33463F;">Little Readers needs JavaScript to be enabled to play.</div></noscript>
<script>
${js}
</script>
</body>
</html>`;
fs.writeFileSync('../little-readers.html',html);
const kb=(Buffer.byteLength(html)/1024).toFixed(0);
console.log("Built little-readers.html ("+kb+" KB)");
