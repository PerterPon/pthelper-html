
const fs = require('fs');


async function start () {
  const ocr = await import('node-native-ocr');
  
  const content = fs.readFileSync('./test.png');
  
  ocr.recognize(content).then(console.log)

}


start();