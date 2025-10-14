import './style.css'
import exitIcon from '../assets/exit.svg';
import sidebar from './sidebar';

    // Main Project
    export const project = document.createElement("div");
    project.classList.add("project__parent");

    // Project Parent
    export const projectSideBar = document.createElement("div");
    projectSideBar.classList.add("project")

    // Project Title
    export const projectHeader = document.createElement("p");
    projectHeader.classList.add("project__title");
    projectHeader.textContent = "My Projects";

    const projectParentAdd = document.createElement("div");
    projectParentAdd.classList.add("project__container");

    // Project Item (add icon parent)
    export const projectAdd = document.createElement("div");
    projectAdd.classList.add("project__container-add");

    const projectAddList = document.createElement("div");
    projectAddList.classList.add("project__container-add-list");
    
    //Project Add Button 
    export const projectAddBtn = document.createElement("button");
    projectAddBtn.classList.add("project__btn-add");

    // Project Item (add icon)
    const addIcon = document.createElement("div");
    addIcon.classList.add("project__add-icon");
    addIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`


    // Project Add Parent 
    projectParentAdd.appendChild(projectAdd);


    // Project Form Container
    const formContainer = document.createElement("div");
    formContainer.classList.add("project__wrapper");

    // Project Form 
    const projectForm = document.createElement("form");
    projectForm.classList.add("project__form");
    projectForm.setAttribute("method", "POST");
    projectForm.setAttribute("action", "");
    
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

    // Project Label (label)
    const projectLabel = document.createElement("h2");
    projectLabel.classList.add("project__label");
    projectLabel.setAttribute("for", "project-title");
    projectLabel.textContent = "Title: ";

    // Project Input 
    const projectInput = document.createElement("input");
    projectInput.classList.add("project__form-title");
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

    // Button Append
    projectAddBtn.appendChild(addIcon);
    projectAddList.appendChild(projectHeader);
    projectAddList.appendChild(projectAddBtn);
    projectAdd.appendChild(projectAddList);

    // Form Header Append
    projectFormHeader.appendChild(projectFormHeaderTitle);
    projectFormHeader.appendChild(projectHeaderExit);

    // Form Actions Append
    projectActions.appendChild(cancelProjectBtn);
    projectActions.appendChild(saveProjectBtn);

    // Form Container Append
    formContainer.appendChild(projectFormHeader);
    formContainer.appendChild(projectForm);
    
    // Project Input Append
    projectTitleItem.appendChild(projectLabel);
    projectTitleItem.appendChild(projectInput);


    // Project Form Append
    projectForm.appendChild(projectTitleItem);
    projectForm.appendChild(projectActions);
    project.appendChild(formContainer);


    //Project Sidebar Interactivity
    projectAddBtn.addEventListener("click", () => {
        formContainer.style.display = "flex";
        project.appendChild(formContainer);
        console.log("Project Add Button Clicked!")
    });

    projectAddBtn.addEventListener("mouseenter", () => {
        projectAddBtn.classList.add("show-add");
        console.log("hover");
    });

    projectAddBtn.addEventListener("mouseleave", () => {
        projectAddBtn.classList.remove("show-add");
        console.log("leave");
    });


    cancelProjectBtn.addEventListener("click", () => {
        formContainer.style.display = "none";
        projectForm.reset();
    });

    projectHeaderExit.addEventListener("click", () => {
        formContainer.style.display = "none";
        projectForm.reset();
    });

    export const projectListParent = document.createElement("div");
    projectListParent.classList.add("project__list");

    //Project Add Project Task
    export const projectAddTaskBtn = document.createElement("button");
    projectAddTaskBtn.classList.add("project__add-task");
    projectAddTaskBtn.type = "submit";
    projectAddTaskBtn.textContent = "Add Task"

    const projectAddIcon = document.createElement("div");
    projectAddIcon.classList.add("project__add-task-icon");
    projectAddIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" fill-opacity="0.8"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`
    
    //Main Section of Project
    export const projectMain = document.createElement("div");
    projectMain.classList.add("project__main-view");

    //Projects that I created
    export const projectListDetail = document.createElement("div");
    projectListDetail.classList.add("project__detail-view");

    export const projectsHeader = document.createElement("h1");
    projectsHeader.classList.add("projects__header");
    projectsHeader.textContent = "My Projects";

    export const projectListHeader = document.createElement("h1");
    projectListHeader.classList.add("project__list-header");

    //project CRUD
    export let listofProjects = [];

    //to know which project is currently open
    let activeProject = null

    //Create Project 
    function handleCreate() {
        let projects = projectInput.value;
        listofProjects.push(projects);
        console.log(listofProjects);

        const newProject = listofProjects.length - 1;
        
        console.log(newProject);

        return newProject;
        
    }


    //Delete Project
    function handleDelete() {

    }

    //Edit Project
    function handleEdit() {

    }


    //Submit New Project
    function handleSubmit() {
        projectForm.addEventListener("submit", function(event) {
            event.preventDefault();
            handleCreate();
            formContainer.style.display = "none";
            projectForm.reset();
            displayProjectCreated(); 
            
            
        });
    }


    export function displayProjectCreated() {
        // Clear previous project items
        projectListParent.innerHTML = "";
    
        // Loop through all created projects
        listofProjects.forEach((projects, index) => {
            const projectList = document.createElement("li");
            projectList.classList.add("project__list-item");
            projectList.dataset.index = index;
    
            const projectLink = document.createElement("a");
            projectLink.href = "#";
            projectLink.textContent = projects;
    

            projectList.appendChild(projectLink);
            projectListParent.appendChild(projectList);
            // projectListDetail.appendChild(projectList);

            // When a project is clicked
            projectList.addEventListener("click", () => {
                console.log("Clicked project:", listofProjects[index]);
                projectListHeader.textContent = listofProjects[index];
            
                // hide My Projects main
                projectMain.style.display = "none";

                // hide project details
                projectListDetail.style.display = "none";

                // hide project header 
                projectsHeader.style.display = "none";


                // update header or title if needed
                projectListHeader.style.display = "flex";
                projectAddTaskBtn.style.display = "flex";
             
               
            });
        });
    
        // Append the project list only once (re-append keeps order but not duplicates)
        projectAdd.appendChild(projectListParent);
    }
    

     // Open Project Task Form when the project task button clicked
    projectAddTaskBtn.addEventListener("click", () => {
        addProjectTaskForm();
        projectAddTaskBtn.style.display = "none";
        
    });

    export function addProjectTaskForm() {

        //Project task form container
        const projectTaskFormContainer = document.createElement("div");
        projectTaskFormContainer.classList.add("project__task-form-container");

        //Project task form
        const projectTaskForm = document.createElement("form");
        projectTaskForm.classList.add("project__task-form");
        projectTaskForm.setAttribute("method", "POST");
        projectTaskForm.setAttribute("action", "");

        const projectTaskHeadings = document.createElement("h1");
        projectTaskHeadings.classList.add("project__task-headings");


        //Project Task Title
        const projectTaskTitleParent = document.createElement("div");
        projectTaskTitleParent.classList.add("project__task-title-parent");


        const projectTaskTitleInput = document.createElement("input");
        projectTaskTitleInput.classList.add("project__task-title-input");
        projectTaskTitleInput.type = "text";
        projectTaskTitleInput.id = "project-task-title";
        projectTaskTitleInput.name = "project-task-title";
        projectTaskTitleInput.placeholder = "Title";
        projectTaskTitleInput.required = true;

        projectTaskTitleParent.appendChild(projectTaskTitleInput);

        //Project Task Description
        const projectTaskDescriptionParent = document.createElement("div");
        projectTaskDescriptionParent.classList.add("project__task-description-parent");

        const projectTaskDescriptionInput = document.createElement("input");
        projectTaskDescriptionInput.classList.add("project__task-title-input");
        projectTaskDescriptionInput.type = "text";
        projectTaskDescriptionInput.id = "project-task-description";
        projectTaskDescriptionInput.name = "project-task-description";
        projectTaskDescriptionInput.placeholder = "Description";
        projectTaskDescriptionInput.required = true;

        projectTaskDescriptionParent.appendChild(projectTaskDescriptionInput);


        const projectTaskPriorityDateParent = document.createElement("div");
        projectTaskPriorityDateParent.classList.add("project__task-priority-date-parent");

        //Project Task Date
        const projectTaskDateParent = document.createElement("div");
        projectTaskDateParent.classList.add("project__task-date-parent");

        const projectTaskDateInput = document.createElement("input");
        projectTaskDateInput.classList.add("project__task-date-input");
        projectTaskDateInput.placeholder = "Date";
        projectTaskDateInput.type = "date";
        projectTaskDateInput.id = "project-task-date";
        projectTaskDateInput.name = "project-task-name";
        projectTaskDateInput.required = true;

        projectTaskDateParent.appendChild(projectTaskDateInput);

        //Project Task Priority
        const projectTaskPriorityParent = document.createElement("div");
        projectTaskPriorityParent.classList.add("project__task-priority-parent");

        const projectTaskPriorityInput = document.createElement("select");
        projectTaskPriorityInput.classList.add("project__task-priority-input");
        projectTaskPriorityInput.id = "project-task-priority";
        projectTaskPriorityInput.name = "project-task-priority";
        projectTaskPriorityInput.required = true;

        const projectTaskPriorityOption = document.createElement("option");
        projectTaskPriorityOption.textContent = "Priority";
        projectTaskPriorityOption.value = "";
        projectTaskPriorityOption.disabled = true;
        projectTaskPriorityOption.selected = true;

        projectTaskPriorityInput.appendChild(projectTaskPriorityOption);
        projectTaskPriorityParent.appendChild(projectTaskPriorityInput)

        projectTaskPriorityDateParent.appendChild(projectTaskDateParent);
        projectTaskPriorityDateParent.appendChild(projectTaskPriorityParent);
     

    
        //Project Task Actions
        const projectTaskActionsParent = document.createElement("div");
        projectTaskActionsParent.classList.add("project__task-actions-parent");

        const projectTaskCancel = document.createElement("button");
        projectTaskCancel.classList.add("project__task-cancel");
        projectTaskCancel.textContent = "Cancel";

        const projectTaskAdd = document.createElement("button");
        projectTaskAdd.classList.add("project__task-add");
        projectTaskAdd.type = "submut";
        projectTaskAdd.textContent = "Add Task";

        projectTaskActionsParent.appendChild(projectTaskAdd);
        projectTaskActionsParent.appendChild(projectTaskCancel);

        projectTaskForm.appendChild(projectTaskTitleParent);
        projectTaskForm.appendChild(projectTaskDescriptionParent);
        // projectTaskForm.appendChild(projectTaskDateParent);
        projectTaskForm.appendChild(projectTaskPriorityDateParent);
        projectTaskForm.appendChild(projectTaskActionsParent);
        project.appendChild(projectTaskForm);


        projectTaskCancel.addEventListener("click", () => {
            projectTaskForm.reset();
            projectTaskForm.style.display = "none";
            projectAddTaskBtn.style.display = "flex";
        });
    }

    function handleCreateProjectTask() {
        //Render projects
    }


    


    handleSubmit();

export default project;