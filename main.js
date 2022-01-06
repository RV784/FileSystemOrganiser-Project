let inputArr = process.argv.slice(2);
let fs = require("fs");
const path = require("path");
//console.log(intputArr);

let command = inputArr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

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
    let destPath;
    if(dirPath == undefined){
        console.log("Kindly enter the path");
        return;
    } else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            //2. create -> organised_files -> directory
            destPath = path.join(dirPath, "organised_files"); //path formed
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }

        } else{
            console.log("Kindly enter a correct path");
            return;
        }
    }

    organiseHelper(dirPath, destPath);

    

}
function organiseHelper(src, dest){
      //3. identify categories of all the files present in that input directory
    let childNames = fs.readdirSync(src);
    //console.log(childNames);

    for(let i = 0 ; i < childNames.length ; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
           //console.log(childNames[i]);
           let category = getCategory(childNames[i]);
           console.log(childNames[i], " belongs to --> ", category);

            //4. copy / cut files to that organised folder directory inside of any of the category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category){

    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(fileName, " copied to ", category);
}

function getCategory(name){
   let ext = path.extname(name);
   //console.log(ext);
   ext = ext.slice(1); 
   for(let type in types){
       let cTypeArray = types[type];
       for(let i = 0 ; i < cTypeArray.length ; i++){
           if(ext == cTypeArray[i]){
               return type;
           }
       }
   }
   return "others";
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