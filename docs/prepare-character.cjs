const sharp=require('C:/Users/Saheem/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs=require('fs');
(async()=>{
 const input='reference/character/expressions-original.png';const meta=await sharp(input).metadata();console.log(meta.width,meta.height,meta.hasAlpha);
 const states=['neutral','blinking','talking','smiling','sleepy','annoyed','celebrating','gear5','67'];
 for(let i=0;i<9;i++) {const left=Math.round(i%3*meta.width/3),top=Math.round(Math.floor(i/3)*meta.height/3),right=Math.round((i%3+1)*meta.width/3),bottom=Math.round((Math.floor(i/3)+1)*meta.height/3);await sharp(input).extract({left,top,width:right-left,height:bottom-top}).resize(192,192).webp({lossless:true}).toFile(`public/art/character/${states[i]}.webp`)}
 await sharp(input).resize(960,960).png().toFile('docs/character-expressions.png');
 fs.writeFileSync('public/art/character/manifest.json',JSON.stringify({frameSize:[192,192],layout:'3x3 reference atlas, fixed-cell extraction; no per-expression trim',states:Object.fromEntries(states.map(s=>[s,`/art/character/${s}.webp`]))},null,2));
})()
