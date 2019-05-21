document.getElementById('copyBtn').addEventListener('click', () => {
    let selection = window.getSelection();        
    let range = document.createRange();
    range.selectNodeContents(document.getElementById('copyLink'));
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy')
    selection.removeAllRanges()
})

let form = document.querySelector('.cal-form');

document.getElementById('cancelBtn').addEventListener('click', () => {
    form.hidden = true;
    form.reset();
})

document.getElementById('addEvent').addEventListener('click', () => form.hidden = false)