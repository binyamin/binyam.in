if(document.getElementById("wordCount")) {
    let content = document.querySelector(".e-content");
    const count = content.textContent.match(/(\w\S*)+/g).length;
    document.getElementById("wordCount").textContent = count + " words"
};