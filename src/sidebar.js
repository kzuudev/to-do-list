import todoListParent from "./todo-list.js";
import today from './today';
import lastWeek from './lastWeek';
import project, { projectHeader, projectAdd, projectAddTaskBtn, addProjectTaskForm, projectAddBtn, displayProjectCreated, projectListHeader, projectsHeader, projectMain, projectListDetail, selectedProjectView} from './project.js';
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
        console.log( pageSections[key] = section)
    }



    sidebarItemList.forEach((item) => {

        const itemList = document.createElement("li");
        itemList.classList.add("sidebar__item-list");
        
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item.title;
        
        itemList.appendChild(link);       
        sidebarItem.appendChild(itemList);
          
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            for(let page in pageSections) {
                pageSections[page].style.display = "none";
                
            }

            pageSections[link.textContent].style.display = "block";
            });
        });

  
        project.appendChild(projectMain);
        projectMain.appendChild(projectsHeader);
        projectMain.appendChild(projectListDetail);

        const projectListItem = document.createElement("li");
        projectListItem.classList.add("sidebar__item-list");
        projectListItem.appendChild(projectAdd);  // contains My Projects + button
        sidebarItem.appendChild(projectListItem);
        
         //Append Project Main View (My Projects with list of project)
         projectMain.style.display = "flex";

        // handle My Projects click manually
        projectHeader.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(projectMain.isConnected);
            
            // Hide other sections (Inbox, Today, etc.)
            for (let page in pageSections) {
                pageSections[page].style.display = "none";
            }
        
            // Show My Projects section
            pageSections["My Projects"].style.display = "block";
        
            // Show My Projects main view
            projectMain.style.display = "flex";
            projectsHeader.style.display = "flex";
            projectListDetail.style.display = "flex";

            // Hide selected project view
            selectedProjectView.style.display = "none";
            projectListHeader.style.display = "none";
            projectAddTaskBtn.style.display = "none";
        });
        

    
    
        // Open Project Task Form when the project task button clicked
        projectAddBtn.addEventListener("click", () => {
            displayProjectCreated();
        });

        


  
      
    return sidebarItem;

    
}






export default sidebar;


