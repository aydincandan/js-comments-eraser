const fs = require('fs');

// Function to remove comment lines
function removeCommentsFromFile(fileContent) {

    const commentRegex1 = /(http:\/\/)/gm;
    const commentRegex2 = /(https:\/\/)/gm;
    const step1 = fileContent.replace(commentRegex1, 'http:--').replace(commentRegex2, 'https:--')

    const commentRegex = /\/\/(?!gm;).*?$|\/\*[\s\S]*?\*\//gm;
    const step2 = step1.replace(commentRegex, '')

    const commentRegex1n = /(http:--)/gm;
    const commentRegex2n = /(https:--)/gm;
    const step3 = step2.replace(commentRegex1n, 'http://').replace(commentRegex2n, 'https://')

    const falseIfBlockRegex = /if\s*\(\s*false\s*\)\s*\{[\s\S]*?\}/gm;
    const step4 = step3.replace(falseIfBlockRegex, '')

    return step4;
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: node nocomments <source.js> <target.js>');
    process.exit(1);
}

const sourceFile = args[0];
const targetFile = args[1];

// Read source file and clear comments
fs.readFile(sourceFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Could not read source file: ${sourceFile}`, err);
        process.exit(1);
    }

    const cleanedContent = removeCommentsFromFile(data);

    // Write cleaned content to destination file
    fs.writeFile(targetFile, cleanedContent, 'utf8', err => {
        if (err) {
            console.error(`Could not write target file: ${targetFile}`, err);
            process.exit(1);
        }
        console.log(`Comments were cleaned up and saved to ${targetFile}.`);
    });
});
