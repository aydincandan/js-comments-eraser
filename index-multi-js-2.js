// const fs = require('fs');
const path = require('path');

const fs = require('fs-extra');


// Function to remove comment lines but keep specific ones
function removeCommentsFromFile(fileContent) {
    const commentRegex1 = /(http:\/\/)/gm;
    const commentRegex2 = /(https:\/\/)/gm;
    const step1 = fileContent.replace(commentRegex1, 'http:--').replace(commentRegex2, 'https:--');

    // "KEEP" ve "gm;" etiketlerini koruyan düzenli ifade
    const commentRegex = /\/\/(?!KEEP\b|gm;).*?$|\/\*(?!.*KEEP\b|gm;)[\s\S]*?\*\//gm;
    const step2 = step1.replace(commentRegex, '');

    const commentRegex1n = /(http:--)/gm;
    const commentRegex2n = /(https:--)/gm;
    const step3 = step2.replace(commentRegex1n, 'http://').replace(commentRegex2n, 'https://');

    const falseIfBlockRegex = /if\s*\(\s*false\s*\)\s*\{[\s\S]*?\}/gm;
    const step4 = step3.replace(falseIfBlockRegex, '');

    return step4;
}

// Recursive function to process files in a directory
function processDirectory(sourceDir, targetDir) {
    // const sourceDir = args[0];
    // const targetDir = args[1];

    // const HEDEFMEVCUT = fs.existsSync(args[1])
    const HEDEFMEVCUT = fs.existsSync(targetDir)

    // console.log(`Kaynak directory: ${sourceDir}`,`Hedef directory: ${targetDir}`);

    // && path.resolve(sourceDir) === path.resolve(targetDir)
    if (!HEDEFMEVCUT) {
        // console.warn(`Skipping processing of target directory to avoid infinite loop: ${targetDir}`);
        // return;

        // , { recursive: false }
        fs.mkdirSync(targetDir); // Create target directory if not exists
        console.log(`Target directory: ${targetDir}`, "CREATED");

    }

    const items = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const item of items) {
        const sourcePath = path.join(sourceDir, item.name);
        const targetPath = path.join(targetDir, item.name);

        if (item.isDirectory()) {
            processDirectory(sourcePath, targetPath);
        } else if (item.isFile() && path.extname(item.name) === '.js') {

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
}

// Get command line arguments
const args = process.argv.slice(2);

// if (args.length !== 2) {
//     console.error('Usage: node js-comments-eraser <sourceDir> <targetDir>');
//     process.exit(1);
// }
if (args.length !== 1) {
    console.error('Usage: node your-js-comments-eraser <sourceDir>');
    process.exit(1);
}

const sourceDir = args[0];
// const targetDir = args[1];
const targetDir = "clean_dist";

console.log("Start processing")
processDirectory(sourceDir, targetDir);
console.log(`All .js files from ${sourceDir} have been processed and saved to ${sourceDir}/${targetDir}.`);




const tasinacakKlasor = path.join(__dirname, targetDir); // Taşınacak klasör
const hedefKonum = path.join(__dirname, sourceDir); // Hedef konum

// console.log(tasinacakKlasor)
// console.log(hedefKonum)

setTimeout(() => {
    fs.move(tasinacakKlasor, hedefKonum, { overwrite: true })
    .then(() => {
        console.log('Successfully moved.');
    })
    .catch(err => {
        console.error('Some things went wrong:', err);
    });
    
}, 1000);
