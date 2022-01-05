let inputArr = process.argv.slice(2);
let fs = require("fs");
const path = require("path/posix");
//console.log(intputArr);

let command = inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    
   case "organise":
       organiseFn(inputArr[1]);
       break;

    case "help":
        helpFn()
        break;
    
    default:
        console.log("Please 🤦‍♂️ enter right command");
        break;
}

function treeFn(dirPath){
    console.log("tree command implemented for ", dirPath);
}

function organiseFn(dirPath){
    //console.log("organise command implemented for ", dirPath);
    //1. input -> directory path given
    if(dirPath == undefined){
        console.log("Kindly enter the path");
        return;
    } else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            //2. create -> organised_files -> directory
            let destPath = path.join(dirPath, "organised_files"); //path formed
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }

        } else{
            console.log("Kindly enter a correct path");
            return;
        }
    }


    //3. identify categories of all the files present in that input directory
    //4. copy / cut files to that organised folder directory inside of any of the category folder
    

}















//help implemented
function helpFn(){
    console.log(`
    List of all commands:
      
       node main.js tree "directoryPath"
       node main.js organise "directoryPath"
       node main.js help "directoryPath"
    `);
}