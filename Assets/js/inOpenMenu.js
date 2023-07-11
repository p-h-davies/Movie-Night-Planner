//movie Night , This is only data when we click on movie Night



let Inout=document.querySelector("#in-out")
let q1=document.querySelector("#q1")
    let activitesNight=document.querySelector(".activites-list-item")
let inBtn=document.querySelector("#inBtn")

inBtn.addEventListener("click",()=>{
    Inout.style.display="none"
    q1.style.display="none"
    activitesNight.classList.add("activitesActive")
})







