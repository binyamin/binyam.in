const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const runIf = (process.env.CI || process.env.DEBUG === "generateimages");

function createImage( title, outPath=__dirname ) {
    const {createCanvas, loadImage, registerFont} = require("canvas");

    const TITLE_TEXT = title;
    const accentColor = "#6FCF97";
    const fontSizeLg = 48;

    registerFont(path.join(__dirname, '../fonts/Inter-Regular.otf'), { family: 'Inter' })
    registerFont(path.join(__dirname, '../fonts/Inter-Bold.otf'), { family: 'Inter', weight: "bold" })

    const canvas = createCanvas(800, 418)
    const ctx = canvas.getContext('2d')

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        // From <https://stackoverflow.com/a/27503574/10055855>
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
        }
        ctx.fillText(line, x, y);
    }
    loadImage(path.join(__dirname, '../src/assets/img/twitter-bg.jpg')).then((image) => {
        ctx.drawImage(image, 0, 0, 800, 418)

        ctx.font = `bold ${fontSizeLg}pt 'Inter'`;
        ctx.fillStyle = accentColor;

        const maxWidth = 800 - 90 - 15; // Total Width - leftPadding - rightPadding
        wrapText(ctx, TITLE_TEXT, 90, 115, maxWidth, fontSizeLg * 1.65);

        ctx.font = `32pt 'Inter'`;
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Binyamin Green", 380, 320)
        const out = fs.createWriteStream(outPath)
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on('finish', () =>  console.log(`The PNG file '${path.basename(outPath)}' was created.`))
    })
}

function slugify(str="") {
    return str
        .toLowerCase()
        .replace(/[^\w\s]+/g,'')
        .replace(/\s+/g,'-')
    ;
}

const run = () => {
    if(fs.existsSync(path.join(__dirname, "../.cache")) === false) {
        fs.mkdirSync(path.join(__dirname, "../.cache"))
    }
    if(fs.existsSync(path.join(__dirname, "../.cache/thumbnails")) === false) {
        fs.mkdirSync(path.join(__dirname, "../.cache/thumbnails"))
    }
    let fileArray = fs.readdirSync(path.join(__dirname, "../src/blog"));

    fileArray.forEach(filePath => {
        if(!(filePath.endsWith(".md") ||filePath.endsWith(".markdown"))) return;

        const content = fs.readFileSync(
            path.join(__dirname, "../src/blog", filePath),
            {encoding: "utf-8"}
        );
        const frontMatterText = content.substring(3, content.indexOf("---", 3)).trim();
        const data = yaml.safeLoad(frontMatterText);

        if(!data.thumbnail) {
            createImage(data.title, path.join(__dirname, "../.cache/thumbnails", slugify(data.title) + ".png"));
        }
    })
};

if (runIf) {
    run();
} else {
    console.log("[scripts] Not CI, skipping generateImages")
}
