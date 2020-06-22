if(process.env.NETLIFY) {
    if(process.env.NODE_ENV !== "production" || !process.env.BRANCH.startsWith("dev/")) {
        console.log("skipping postinstall")
        return;
    }
}


const cp = require('child_process');

const result = function(command){
    return new Promise((resolve, reject) => {
        cp.exec(command, function(err, stdout, stderr){
            if(err != null){
                reject(err);
            }else if(typeof(stderr) != "string"){
                reject(stderr);
            }else{
                resolve(stdout);
            }
        })
    })
}


result("git --version").then( __ => {
    result("git remote get-url notes")
    .then(__ => {
        console.log("Remote `notes` found")
    })
    .catch(__ => {
        result("git remote add notes https://github.com/b3u/notes")
    })
    .finally(__ => {
        result("git subtree add --squash --prefix=src/notes/ notes master")
            .then(__ => {
                console.log("Files written to src/notes")
            })
            .catch(e => {
                console.error(e.message)
            })
    })
}).catch(error => {
    console.log(error.message)
})