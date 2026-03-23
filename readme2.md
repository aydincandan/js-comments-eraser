npx esbuild ./jscommentseraser.js --outfile=./clean_dist/index.js   // YALNIZCA AÇIKLAMALAR YOK OLUYOR  DAHA İYİ 
npx terser ./jscommentseraser.js -o ./clean_dist/indexY.js   // AÇIKLAMALAR YOK OLUYOR TEK SATIR
npx esbuild ./jscommentseraser.js --minify-whitespace --outfile=./clean_dist/indexZ.js   // AÇIKLAMALAR YOK OLUYOR TEK SATIR
