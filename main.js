/*-------Modules-------
  - Navbar underline effect
*/

// Navbar underline effect

const navlink = document.querySelectorAll('.nav-link');

navlink.forEach(function(e) {
    e.addEventListener('click', function(){
        navlink.forEach( a => a.classList.remove('active'));
        this.classList.toggle('active');
    })
})