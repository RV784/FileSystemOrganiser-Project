let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
// console.log(inputArr);

//node main.js tree "Directory path"
//node main.js organise "Directory path"
//node main.js help

let command = inputArr[0];

let types = {
    media:["mp4", "mkv"],
    archives:['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"], 
    documents:['docx', 'doc', 'pdf', 'xlsx', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app:['exe', 'dmg', 'pkg', 'deb']
}

switch (command){

    case "tree":
        treeFn(inputArr[1]);
        break;
    
    case "organize":
        organizeFn(inputArr[1]);
        break;

    case "help":
        helpFn();
        break; 
        
    default:
        console.log("Please input a right command😉");
        break;    
}

function treeFn(dirPath){
    // console.log("tree command implemented for ", dirPath);

    //let destPath;
    if(dirPath == undefined){
        console.log("Please enter the path too😊");
        return;
    }else{
        let doesExists = fs.existsSync(dirPath);
        if(doesExists){
            treeHelper(dirPath, "");
        }else{
            console.log("Please enter a correct path😊");
            return;
        }
    }
}

function treeHelper(dirPath, indent){
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName = path.basename(dirPath);     
        console.log(indent + "|-- " + fileName)  ;
    }else{
        let dirName = path.basename(dirPath)
        console.log(indent + "|__ " + dirName);
        let children = fs.readdirSync(dirPath);
        for(let i = 0 ; i < children.length ; i++){
            let childPath = path.join(dirPath , children[i])
            treeHelper(childPath, indent + "\t");
        }
    }
}

function organizeFn(dirPath){
    // console.log("organize command implemented for ", dirPath);
    
    //input - dirPath given
    let destPath;
    if(dirPath == undefined){
        console.log("Please enter the path too😊");
        return;
    }else{
        let doesExists = fs.existsSync(dirPath);
        if(doesExists){
            //create -> organised_files directory
            destPath = path.join(dirPath, "organised_files"); //path created
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath); //file created if not present in the destPath
            }
        }else{
            console.log("Please enter a correct path😊");
            return;
        }
    }

    organizeHelper(dirPath, destPath); //from, where - to organise
    //create -> organised_files directory
    //Identify categories of all the files in that input directory
    //copy/ cut files to that organised_file directory of any of the category folder
}

function organizeHelper(src, dest){
    //Identify categories of all the files in that input directory
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for(let i = 0 ; i < childNames.length ; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belongs to ", category);
            //copy/ cut files to that organised_file directory of any of the category folder
            sendFiles(childAddress, dest, category); //this file to be copied, to be pasted in this folder, category folder in the destination
        }
    }
}

function sendFiles(srcFilePath, dest, category){

    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath); //returns the file type part of the srcFile
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    // console.log()
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    
    for(let type in types){
        let ctypeArray = types[type];
        for(let i = 0 ; i < ctypeArray.length ; i++){
            if(ext == ctypeArray[i]){
                return type;
            }
        }
    }

    return "others";
}

function helpFn(dirPath){
    console.log(`
    List of all the commands:
      node main.js tree "Directory path"
      node main.js organise "Directory path"
      node main.js help
    `);
}