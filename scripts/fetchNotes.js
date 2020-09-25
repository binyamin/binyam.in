const cp = require('child_process');

function result(command) {
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

async function fetchNotes() {
    try {
        // Assuming git is installed, configure git environment
        await result("git --version");

        if (process.env.NETLIFY) {
            await result("git config user.name \"Netlify Buildbot\" && git config user.email \"foo@bar.io\"");
        }

        // Add remote `notes`, if not existing.
        try {
            await result("git remote get-url notes");
            console.log("[fetchNotes] Remote `notes` found");
        } catch (e) {
            result("git remote add notes https://github.com/binyamin/notes");
            console.log("[fetchNotes] ", e.message);
        }


        // The next three lines copy `notes/master` into a subdirectory without
        // committing them, yet leaving the working tree clean. It's based on
        // https://bneijt.nl/blog/post/merge-a-subdirectory-of-another-repository-with-git/
        await result("git merge -s ours --no-commit notes/master");
        await result("git read-tree --prefix=src/notes/ -u notes/master");
        await result("git reset");
    } catch(error) {
        throw error;
    }
}

if (process.env.NETLIFY || process.env.NODE_ENV==="production") {
    fetchNotes()
        .then(() => {
            console.log("[fetchNotes] Notes written to `src/notes`")
        })
        .catch(e => {
            throw e;
        })
}
else {
    console.log("[fetchNotes] Skipping");
}
