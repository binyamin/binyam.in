const cp = require('child_process');
const del = require("del");

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

async function configureGit() {
    try {
        // Assuming git is installed, configure git environment
        await result("git --version");

        if (process.env.NETLIFY) {
            console.log("[fetchNotes] configure git user")
            await result("git config user.name \"Netlify Buildbot\" && git config user.email \"foo@bar.io\"");
        }

        // Add remote `notes`, if not existing.
        try {
            await result("git remote get-url notes");
            console.log("[fetchNotes] Remote `notes` found");
        } catch (e) {
            await result("git remote add notes https://github.com/binyamin/notes");
            console.log("[fetchNotes] ", e.message);
        }
        await result("git fetch notes")
    } catch(error) {
        throw new Error(error);
    }
}

function fetchNotes() {
    // The next three lines copy the contents of `notes/master` into a subdirectory
    // without committing them, yet leaving the working tree clean. It's based on
    // https://bneijt.nl/blog/post/merge-a-subdirectory-of-another-repository-with-git/
    result("git merge -s ours --no-commit notes/master")
    .catch(_ => {})
    .finally(async () => {
        try {
            await del(["src/notes/**/*.md", "src/notes/.git*"]);
            await result("git read-tree --prefix=src/notes/ -u notes/master");
            await result("git reset");
            console.log("[fetchNotes] Notes written to `src/notes`")
            del(["src/notes/.git*"]);
        } catch (err) {
            console.error(err)
        }
    })
}

if (process.env.NETLIFY || process.env.NODE_ENV==="production") {
    configureGit()
        .then(() => {
            fetchNotes();
        })
        .catch(e => {
            console.error(e);
        })
}
else {
    console.log("[fetchNotes] Skipping");
}
