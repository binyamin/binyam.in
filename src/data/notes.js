const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const fetchNotes = async () => {
    const Bucket = "binyamin-notes";

    const s3 = new AWS.S3({
        apiVersion: '2006-03-01', region: "us-east-1"
    });


    const bucket = await s3.listObjectsV2({ Bucket }).promise();

    const files = bucket.Contents.filter(f => {
        return f.Key.endsWith(".md") || f.Key.endsWith(".markdown")
    })

    const notes = [];
    for(const file of files) {
        const stream = await s3.getObject({
            Bucket,
            Key: file.Key,
            ResponseContentType: "text/plain",
            ResponseContentEncoding: "utf8"
        }).promise();

        function slugify(str) {
            return str
            .toLowerCase()
            .replace(/[^\w\s\-]+/g,'')
            .replace(/\s+/g,'-')
        }
        notes.push({
            name: slugify(file.Key).replace(/\.[md|markdown]$/g, ''),
            title: file.Key.replace(/\.[md|markdown]$/g, ''),
            body: stream.Body.toString()
        })
    }

    return notes;
}

module.exports = async function() {
    const cacheDir = path.join(__dirname, "../../.cache");
    const cachedFile = path.join(cacheDir, "notes.json");

    if(fs.existsSync(cacheDir) === false) {
        fs.mkdirSync(cacheDir)
    }
    if(process.env.NODE_ENV === "production") {
        return await fetchNotes();
    } else {
        if(fs.existsSync(cachedFile)) {
            return JSON.parse(fs.readFileSync(cachedFile, {encoding: "utf-8"}));
        } else {
            const notes = await fetchNotes();
            fs.writeFileSync(cachedFile, JSON.stringify(notes, null, 4))
            return notes;
        }
    }
}