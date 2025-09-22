import './style.css'
import exitIcon from '../assets/exit.svg';

    // Main Project
    const project = document.createElement("div");
    project.classList.add("project__parent");

    // Project Parent
    export const projectSideBar = document.createElement("div");
    projectSideBar.classList.add("project")

    // Project Title
    export const projectHeader = document.createElement("p");
    projectHeader.classList.add("project__title");
    projectHeader.textContent = "My Projects";

    // Project Item (add icon parent)
    export const projectAdd = document.createElement("div");
    projectAdd.classList.add("project__container-add");
    
    //Project Add Button 
    export const projectAddBtn = document.createElement("button");
    projectAddBtn.classList.add("project__btn-add");

    // Project Item (add icon)
    const addIcon = document.createElement("div");
    addIcon.classList.add("project__add-icon");
    addIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`


    projectAddBtn.appendChild(addIcon);

    projectAdd.appendChild(projectHeader)
    projectAdd.appendChild(projectAddBtn);
   

    const kru = document.createElement("p");
    kru.textContent = "Project Task";

    project.appendChild(kru);

    
    // Project Form Container
    const formContainer = document.createElement("div");
    formContainer.classList.add("project__wrapper");

    // Project Form 
    const projectForm = document.createElement("form");
    projectForm.classList.add("project__form");
    
    // Project Form Headings

    const projectFormHeader = document.createElement("div");
    projectFormHeader.classList.add("project__header");

    const projectFormHeaderTitle = document.createElement("h1");
    projectFormHeaderTitle.classList.add("project__header-title");
    projectFormHeaderTitle.textContent = "New Project";

    const projectHeaderExit= document.createElement("div");
    projectHeaderExit.classList.add("project__header-exit");

    const headerExitBtn = document.createElement("button");
    headerExitBtn.classList.add("project__btn-exit");

    const headerExitIcon = document.createElement("img");
    headerExitIcon.classList.add("exit-icon");
    headerExitIcon.src = exitIcon;

    headerExitBtn.appendChild(headerExitIcon);
    projectHeaderExit.appendChild(headerExitBtn);

 

    // Project Title Container
    const projectTitleItem = document.createElement("div");
    projectTitleItem.classList.add("project__title-parent");

    // Project Label
    const projectLabel = document.createElement("h2");
    projectLabel.classList.add("project__label");
    projectLabel.setAttribute("for", "project-title");
    projectLabel.textContent = "Title: ";

    // Project Input (label)
    const projectInput = document.createElement("input");
    projectInput.classList.add("project__title");
    projectInput.type = "text";
    projectInput.id = "project-title";
    projectInput.name = "project-title";
    projectInput.required = true;

    // Project Actions (Add Project & Close) Parent
    const projectActions = document.createElement("div");
    projectActions.classList.add("project__actions");

    // Project Actions (Add Project)
    const saveProjectBtn = document.createElement("button");
    saveProjectBtn.classList.add("project__btn-save")
    saveProjectBtn.type = "submit";
    saveProjectBtn.textContent = "Add Project";

    // Project Actions (Close)

    const cancelProjectBtn = document.createElement("button");
    cancelProjectBtn.classList.add("project__btn-cancel");
    cancelProjectBtn.textContent = "Cancel";

    projectFormHeader.appendChild(projectFormHeaderTitle);
    projectFormHeader.appendChild(projectHeaderExit);


    projectActions.appendChild(cancelProjectBtn);
    projectActions.appendChild(saveProjectBtn);

    formContainer.appendChild(projectFormHeader);
    formContainer.appendChild(projectForm);
    
    
    projectTitleItem.appendChild(projectLabel);
    projectTitleItem.appendChild(projectInput);

    projectForm.appendChild(projectTitleItem);
    projectForm.appendChild(projectActions);



    projectAddBtn.addEventListener("click", () => {
        project.appendChild(formContainer)
    });

    //edit (save & cancel) button parent



    //edit (save & cancel) button child


    //project CRUD


export default project;