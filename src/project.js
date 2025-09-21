import { add } from "date-fns";
import './style.css'


    // Main Project
    const project = document.createElement("div");
    project.classList.add("project__parent");

    // Project Parent
    export const projectSideBar = document.createElement("div");
    projectSideBar.classList.add("project")

    // Project Title
    export const projectTitle = document.createElement("p");
    projectTitle.classList.add("project__title");
    projectTitle.textContent = "My Projects";

    // Project Item (add icon parent)
    const projectAdd = document.createElement("div");
    projectAdd.classList.add("project__container-add");
    
    //Project Add Button 
    const projectAddBtn = document.createElement("button");
    projectAddBtn.classList.add("project__btn-add");

    // Project Item (add icon)
    const addIcon = document.createElement("div");
    addIcon.classList.add("project__add-icon");
    addIcon.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`


    projectAddBtn.appendChild(addIcon);
    projectAdd.appendChild(projectAddBtn);
    projectAdd.appendChild(projectTitle)


  
    


    const kru = document.createElement("p");
    kru.textContent = "Project Task";

    project.appendChild(kru);


    
    //project form

    //edit (save & cancel) button parent



    //edit (save & cancel) button child


    //project CRUD


export default project;