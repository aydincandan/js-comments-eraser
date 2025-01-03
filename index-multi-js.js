// KEEP: # 1.0.2
// https://chatgpt.com/share/67758592-d174-8011-be5b-642a87e71019
const fs = require('fs');
const path = require('path');

// Function to remove comment lines
function removeCommentsFromFile(fileContent) {
    const commentRegex1 = /(http:\/\/)/gm;
    const commentRegex2 = /(https:\/\/)/gm;
    const step1 = fileContent.replace(commentRegex1, 'http:--').replace(commentRegex2, 'https:--');

    const commentRegex = /\/\/(?!gm;).*?$|\/\*[\s\S]*?\*\//gm;
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
    if (fs.existsSync(targetDir) && path.resolve(sourceDir) === path.resolve(targetDir)) {
        console.warn(`Skipping processing of target directory to avoid infinite loop: ${targetDir}`);
        return;
    }
    
    fs.mkdirSync(targetDir, { recursive: true }); // Create target directory if not exists

    const items = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const item of items) {
        const sourcePath = path.join(sourceDir, item.name);
        const targetPath = path.join(targetDir, item.name);

        if (item.isDirectory()) {
            processDirectory(sourcePath, targetPath); // Recurse into subdirectory
        } else if (item.isFile() && path.extname(item.name) === '.js') {
            const fileContent = fs.readFileSync(sourcePath, 'utf8');
            const cleanedContent = removeCommentsFromFile(fileContent);
            fs.writeFileSync(targetPath, cleanedContent, 'utf8');
            console.log(`Processed: ${sourcePath} -> ${targetPath}`);
        }
    }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: node js-comments-eraser <sourceDir> <targetDir>');
    process.exit(1);
}

const sourceDir = args[0];
const targetDir = args[1];

// Start processing
processDirectory(sourceDir, targetDir);
console.log(`All .js files from ${sourceDir} have been processed and saved to ${targetDir}.`);
