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

module.exports={
    treeKey = treeFn
}