import todoListParent from "./todo-list.js";
import today from './today';
import lastWeek from './lastWeek';
import project, { projectHeader, projectAddBtn }from './project.js';
import './style.css'

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
        { title: projectHeader.textContent }, 
    ]

    const renderPages = {
        "Inbox": () => todoList(),
        "Today": () => today(),
        "Last Week": () => lastWeek(),
        [projectHeader.textContent]: () => projectsPage()
    };
    
    const pageSections = {} // store the actual DOM nodes

    // render the pages all once
    for(let key in renderPages) {
        const section = renderPages[key]() // return function and the DOM element that page creates.
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

        if (item.title === projectHeader.textContent) {
            sidebarItem.addEventListener("mouseenter", () => {
              sidebarItem.classList.add("show-add");
              console.log("hover");
              sidebarItem.appendChild(projectAddBtn);
            });
          
            sidebarItem.addEventListener("mouseleave", () => {
              sidebarItem.classList.remove("show-add");
              console.log("leave");
              if (sidebarItem.contains(projectAddBtn)) {
                sidebarItem.removeChild(projectAddBtn);
              }
            });
          
            sidebarItem.addEventListener("focus", () => sidebarItem.classList.add("show-add"));
            sidebarItem.addEventListener("blur",  () => sidebarItem.classList.remove("show-add"));
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


