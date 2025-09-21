import todoListParent from "./todo-list.js";
import today from './today';
import lastWeek from './lastWeek';
import project, { projectTitle }from './project.js';

function todoList() {
    return todoListParent
}

function projectsPage() {
    return project
}


function sidebar() {

    const todoListParent = document.getElementById("todo-list");
    
    const sidebarItem = document.createElement("div");
    sidebarItem.classList.add("sidebar__item");

    const sidebarItemList = [
        { title: "Inbox",},
        { title: "Today",},
        { title: "Last Week",},
        { title: projectTitle.textContent }, 
    ]

    const renderPages = {
        "Inbox": () => todoList(),
        "Today": () => today(),
        "Last Week": () => lastWeek(),
        [projectTitle.textContent]: () => projectsPage()
    };
    
    const pageSections = {} // store the actual DOM nodes

    //render the pages all once
    for(let key in renderPages) {
        const section = renderPages[key]() //return function and the DOM element that page creates.
        todoListParent.appendChild(section);
        section.style.display = "none";
        pageSections[key] = section; 
    }

    sidebarItemList.forEach((item) => {

        const itemList = document.createElement("li");
        itemList.classList.add("sidebar__item-list");
        
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item.title;
        
        itemList.appendChild(link);       
        sidebarItem.appendChild(itemList);

        if (item.title === projectTitle.textContent) {
            link.addEventListener("mouseenter", () => {
              project.classList.add("show-add");
            });
            link.addEventListener("mouseleave", () => {
              project.classList.remove("show-add");
            });
            // keyboard-friendly
            link.addEventListener("focus", () => project.classList.add("show-add"));
            link.addEventListener("blur",  () => project.classList.remove("show-add"));
          }
          
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            for(let page in pageSections) {
                pageSections[page].style.display = "none";
            }

            pageSections[link.textContent].style.display = "block";
            
            });
        });

      
    return sidebarItem;

    
}






export default sidebar;


