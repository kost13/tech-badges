const fs = require('fs');
const yaml = require('js-yaml');

function preProcessFile(sourceFile, targetFile){
    try {
        let fileContents = fs.readFileSync(sourceFile, 'utf8');
        let data = yaml.safeLoad(fileContents);
        let githubUrl = "https://github.com/trending/";

        let filtered = {}

        let regex = new RegExp("^[a-zA-Z0-9]*$");

        for (key in data){
            if("color" in data[key]){

                let processed_key = key
                if("aliases" in data[key] && !regex.test(key)){
                    for(alias of data[key].aliases){
                        if(regex.test(alias)){
                            processed_key = alias;                            
                            break;
                        }
                    }
                }

                processed_key = processed_key.toLowerCase().replace(/ /g, "_").replace(/#/g, "sharp").replace(/\+/g, "p");

                filtered[processed_key] = {
                    color: data[key].color,
                    name: key,
                    url: githubUrl + processed_key
                };
            }
        }



        let filteredStr = yaml.safeDump({Languages: filtered});
        fs.writeFileSync(targetFile, filteredStr, 'utf8');    
    } catch (e) {
        console.log(e);
    }
}

if (require.main === module) {
    let source = "../config/linguist/lib/linguist/languages.yml";
    let target = "../dist/languages.yml";
    preProcessFile(source, target);    
}
  