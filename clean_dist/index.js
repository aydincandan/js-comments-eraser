"use strict";
const fs = require("fs");
const path = require("path");
function move(src, dest) {
  const srcPath = path.resolve(src);
  const destPath = path.resolve(dest);
  fs.renameSync(srcPath, destPath);
}
function removeCommentsFromFile(fileContent) {
  const step1 = fileContent.replace(/(http:\/\/)/gm, "http:--").replace(/(https:\/\/)/gm, "https:--");
  const commentRegex = /\/\/(?!KEEP\b|gm;).*?$|\/\*(?!.*KEEP\b|gm;)[\s\S]*?\*\//gm;
  const commentRegex2 = /\/\/(?!KEEP\b|gm;|g;).*?$|\/\*(?!.*KEEP\b|gm;|g;)[\s\S]*?\*\//gm;
  const step2 = step1.replace(commentRegex2, "");
  const step3 = step2.replace(/(http:--)/gm, "http://").replace(/(https:--)/gm, "https://");
  const step4 = step3;
  return step4;
}
function processDirectory(sourceDir2, targetDir2) {
  const HEDEFMEVCUT = fs.existsSync(targetDir2);
  if (!HEDEFMEVCUT) {
    fs.mkdirSync(targetDir2);
  }
  const items = fs.readdirSync(sourceDir2, { withFileTypes: true });
  for (const item of items) {
    const sourcePath = path.join(sourceDir2, item.name);
    const targetPath = path.join(targetDir2, item.name);
    if (item.isDirectory() && (item.name !== "node_modules" && item.name !== "clean_dist")) {
      processDirectory(sourcePath, targetPath);
    } else if (item.isFile() && path.extname(item.name) === ".js" || path.extname(item.name) === ".mjs") {
      const fileContent = fs.readFileSync(sourcePath, "utf8");
      const cleanedContent = removeCommentsFromFile(fileContent);
      if (targetPath && cleanedContent)
        try {
          fs.writeFileSync(targetPath, cleanedContent, "utf8");
        } catch (_writeFileSyncERROR) {
          console.log({ _writeFileSyncERROR });
        }
      else {
        console.log({ targetPath, cleanedContent });
      }
    }
  }
}
const args = process.argv.slice(2);
console.log({ args });
if (args.length !== 1) {
  console.error("Usage: node [your-js-comments-eraser] <sourceDir>");
  process.exit(1);
}
let sourceDir = args[0];
let targetDir = "clean_dist";
console.log();
console.log("***********************");
processDirectory(sourceDir, targetDir);
console.log(`"${sourceDir}" klas\xF6r\xFCndeki t\xFCm JavaScript dosyalar\u0131n\u0131n yorum sat\u0131rlar\u0131 silindi ve ayn\u0131 seviyede olu\u015Fturulan "./${targetDir}" klas\xF6r\xFCne kopyaland\u0131.`);
console.log("***********************");
const exportet = (user__dirname) => {
  if (true) {
    sourceDir = path.join(user__dirname, targetDir);
    targetDir = path.join(user__dirname, args[0]);
    const finalDestination = path.join(targetDir, path.basename(sourceDir));
    setTimeout(() => {
      move(sourceDir, finalDestination);
    }, 1);
  }
};
module.exports.dirname = exportet;
