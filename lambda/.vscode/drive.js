var event = require(`./${process.argv[2]}`)

function resolve(result) {
    console.log("-------------SUCCESS-------------")
    console.log(JSON.stringify(result,undefined,4));
}
  
function reject(error) {
    console.log("-------------ERROR-------------")
    console.log(error);
    console.log(error.stack);
}

var index = require(`../index.js`);
index.handler(event, {})
.then(resolve, reject)



