//KEEP: # 1.1.8
// https://chatgpt.com/share/67758592-d174-8011-be5b-642a87e71019
'use strict';

const fs = require('fs');
const path = require('path');

// https://chatgpt.com/share/677aae47-081c-8011-93cb-333cda2cfe22
function move(src, dest) {
  const srcPath = path.resolve(src);
  const destPath = path.resolve(dest);
  fs.renameSync(srcPath, destPath);
}
//move('source.txt', 'destination.txt');



// Function to remove comment lines but keep specific ones
function removeCommentsFromFile(fileContent) {
    //KEEP REF: https://chatgpt.com/share/67758592-d174-8011-be5b-642a87e71019
    const step1 = fileContent
        .replace(/(http:\/\/)/gm, 'http:--')
        .replace(/(https:\/\/)/gm, 'https:--'); // ilk yapılan tüm http(s) leri -- ile koruma altına alıyoruz? Nedenki sebebi?

    // "KEEP" ve "gm;" etiketlerini koruyan düzenli ifade       buda olması lazım       //g;
    const  commentRegex = /\/\/(?!KEEP\b|gm;).*?$|\/\*(?!.*KEEP\b|gm;)[\s\S]*?\*\//gm;
    // //g; da eklendi aşağıda.
    const commentRegex2 = /\/\/(?!KEEP\b|gm;|g;).*?$|\/\*(?!.*KEEP\b|gm;|g;)[\s\S]*?\*\//gm;

    const step2 = step1
        .replace(commentRegex2, ''); // ikinci yapılan tüm yorum satırları siliniyor iken "KEEP" ve "gm;" ve "g;" etiketleri de korunuyor.

    const step3 = step2
        .replace(/(http:--)/gm, 'http://')
        .replace(/(https:--)/gm, 'https://');

    // const falseIfBlockRegex = /if\s*\(\s*false\s*\)\s*\{[\s\S]*?\}/gm;
    const step4 = step3
    // .replace(falseIfBlockRegex, '');

    return step4;
}

// Recursive function to process files in a directory
function processDirectory(sourceDir, targetDir) {

    const HEDEFMEVCUT = fs.existsSync(targetDir)

    if (!HEDEFMEVCUT) {
        fs.mkdirSync(targetDir); // Create target directory if not exists
        // console.log(`Target directory: ${targetDir}`, "CREATED");
    }

    const items = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const item of items) {
        const sourcePath = path.join(sourceDir, item.name);
        const targetPath = path.join(targetDir, item.name);
        // console.log("TEST(1)",{ sourcePath, targetPath }, {itemisdir:item.isDirectory(),itname:item.name})

        if (item.isDirectory() && (item.name !== 'node_modules' && item.name !== 'clean_dist')) {
            processDirectory(sourcePath, targetPath);
        } else if (item.isFile() && path.extname(item.name) === '.js' || path.extname(item.name) === '.mjs') {

            const fileContent = fs.readFileSync(sourcePath, 'utf8');
            const cleanedContent = removeCommentsFromFile(fileContent);

            if (targetPath && cleanedContent)
                try {
                    fs.writeFileSync(targetPath, cleanedContent, 'utf8');
                    // console.log({ targetPath })
                } catch (_writeFileSyncERROR) {
                    console.log({ _writeFileSyncERROR })
                }
            else {
                console.log({ targetPath, cleanedContent });
            }

            // console.log(sourceDir, "\t\t\t->", targetPath);
        }
    }
    // console.log("Bitti", { sourceDir, targetDir })
}

// Get command line arguments
const args = process.argv.slice(2);

// console.log({ args });

// if (args.length !== 2) {
//     console.error('Usage: node [your-js-comments-eraser] <sourceDir> <targetDir>');
//     process.exit(1);
// }
if (args.length !== 1) {
    console.error('Usage: node [your-js-comments-eraser] <sourceDir>');
    process.exit(1);
}

let sourceDir = args[0]; // basit ifade
let targetDir = "clean_dist"; // basit ifade

console.log()
console.log("***********************")
// console.log("Start processing", { sourceDir })
processDirectory(sourceDir, targetDir);
console.log(`The comment lines of all javascript files in the  "${sourceDir}"  folder were deleted and copied to the  "${targetDir}"  folder created in the same folder.`);
console.log("***********************")


const exportet = (user__dirname) => {


    if (true) {

        sourceDir = path.join(user__dirname, targetDir)//** gerçek/tam ifade */
        targetDir = path.join(user__dirname, args[0])//** gerçek/tam ifade */

        // console.log({ sourceDir, targetDir, user__dirname });

        const finalDestination = path.join(targetDir, path.basename(sourceDir));
        // console.log("input params", { sourceDir, targetDir })
        // console.log("move params2", { sourceDir, finalDestination })

        setTimeout(() => {

            move(sourceDir, finalDestination)

        }, 1);


    }

}

module.exports.dirname = exportet