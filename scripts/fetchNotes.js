const cp = require('child_process');
const fs = require("fs");

// Get node to recognize global modules

const result = function(command) {
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

const fetchNotes = () => {
    result("git --version").then( __ => {
        result("git remote get-url notes")
        .then(__ => {
            console.log("Remote `notes` found")
        })
        .catch(__ => {
            result("git remote add notes https://github.com/binyamin/notes")
        })
        .finally(__ => {
            if(process.env.NETLIFY) {
                result("git config user.name \"Foobar\" && git config user.email \"foo@bar.io\"")
                    .catch(e => console.error(e))
            }

            result("git status").then(out => console.log(out)) // For debugging purposes

            result("git subtree add --squash --prefix=src/notes/ notes master")
                .then(__ => {
                    fs.copyFileSync("scripts/notesdata", "src/notes/notes.11tydata.js")
                    console.log("Files written to src/notes")
                })
                .catch(e => {
                    console.error(e.message)
                })
        })
    }).catch(error => {
        console.log(error.message)
    })
}

if (process.env.NETLIFY || process.env.NODE_ENV==="production"){
    fetchNotes();
}
else {
    console.log("Skipping fetchNotes");
}