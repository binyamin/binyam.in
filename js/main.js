/*-------Sections-------
  - Navbar underline effect
  - Responsive Navbar & hamburger animation
  - Update copyright year
*/

// Navbar underline effect
const navlink = document.querySelectorAll('.nav-link');

navlink.forEach(function(e) {
    e.addEventListener('click', function(){
        navlink.forEach( a => a.classList.remove('current'));
        this.classList.toggle('current');
   	})
})



//Responsive Navbar

document.querySelector('.hamburger').addEventListener('click', function(){
    this.classList.toggle('responsive');
    document.querySelector('.nav').classList.toggle('activeMenu');
 })

//Copyright Year
document.querySelector('.copy').innerHTML = new Date().getFullYear();
