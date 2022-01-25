
function helpFn(dirPath){
    console.log(`
    List of all the commands:
      node main.js tree "Directory path"
      node main.js organise "Directory path"
      node main.js help
    `);
}

module.exports={
    helpkey: helpFn
}