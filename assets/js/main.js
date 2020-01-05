document.querySelectorAll('.panel-tab-js').forEach(a => {
    a.addEventListener('click', ev => {
        ev.preventDefault();
        document.querySelectorAll('.panel').forEach(p => p.hidden = true)
        document.getElementById(a.dataset.href).hidden = false;
    })
})