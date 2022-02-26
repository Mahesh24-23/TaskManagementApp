
const taskContainer=document.querySelector(".task_container");
let globalTaskData=[];

const addNewCard=()=>{

    const card={
        id:`${Date.now}`,
        image:document.getElementById("TaskImageURL").value,     
        title:document.getElementById("TaskTitle").value,
        type:document.getElementById("TaskType").value,
        description:document.getElementById("description" ).value,
    };
   


globalTaskData.push(card);
localStorage.setItem("taskyCA", JSON.stringify({ cards: globalTaskData }));


//generate HTML code for new card

const newCard=`<div class="col-md-6 col-lg-4 my-4" id=${card.id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button class="btn btn-outline-info" name="${card.id}" onclick="editCard.apply(this,arguments)">
      <i class="fa fa-pencil" aria-hidden="true" name="${card.id}" ></i>
    </button>
   <button class="btn btn-outline-danger" name="${card.id}" onclick="deleteCard.apply(this,arguments)">
     <i class="fa fa-trash-o" aria-hidden="true" name="${card.id}" onclick="deleteCard.apply(this,arguments)"></i>
  </button> 
  
  </div>
  <div class="card-body">
      <img class="card-img" 
      src="${card.image}">
    <h5 class="card-title">${card.title}</h5>
    <p class="card-text"> 
    ${card.description}
    </p>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary">View Task</button>
  </div>
</div>

</div>
`


//inseert into dom

taskContainer.insertAdjacentHTML("beforeend",newCard);


//clear the form
document.getElementById("TaskImageURL").value=""
document.getElementById("TaskTitle").value=""
document.getElementById("TaskType").value=""
document.getElementById("description" ).value=""


};



const loadExistingCards=()=>{
//check local storage
const getData=localStorage.getItem("taskyCA");
//parse JSON data if exist
if(!getData) return;
const taskCards=JSON.parse(getData);
globalTaskData=taskCards.cards;

//generate html code
globalTaskData.map((card)=>{
  newCard= `<div class="col-md-6 col-lg-4 my-4" id=${card.id} >
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
      <button class="btn btn-outline-info" name="${card.id}" onclick="editCard.apply(this,arguments)">
        <i class="fa fa-pencil" aria-hidden="true" name="${card.id}"></i>
      </button>
     <button class="btn btn-outline-danger" name="${card.id}" onclick="deleteCard.apply(this,arguments)">
       <i class="fa fa-trash-o" aria-hidden="true" name="${card.id}" onclick="deleteCard.apply(this,arguments)"></i>
    </button> 
    
    </div>
    <div class="card-body">
        <img class="card-img" 
        src="${card.image}">
      <h5 class="card-title">${card.title}</h5>
      <p class="card-text"> 
      ${card.description}
      </p>
    </div>
    <div class="card-footer">
      <button class="btn btn-outline-primary" name="${card.id}">View Task</button>
    </div>
  </div>
  
  </div>
  `

  //insert into dom
  taskContainer.insertAdjacentHTML("beforeend",newCard);

});
return ;
};


const deleteCard=(event)=>{
  const targetID=event.target.getAttribute("name");
  const elementType=event.target.tagName;
  const removeTask=globalTaskData.filter((task)=>{
    return task.id !== targetID;
  });
  globalTaskData=removeTask;
  localStorage.setItem("taskyCA", JSON.stringify({ cards: globalTaskData }));
  
  //access DOM to remove the card
  if(elementType==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);

  }
  else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


const editCard=(event)=>{
  const targetID=event.target.getAttribute("name");
  const elementType=event.target.tagName;

  let taskTitle;
  let TaskType;
  let taskDescription;
  let parentElement;
  let submitButton;
  if(elementType==="BUTTON"){
    parentElement=event.target.parentNode.parentNode.parentNode;

  }

  else{
    parentElement=event.target.parentNode.parentNode.parentElement.parentNode;
  }
  taskTitle=parentElement.childNodes[1].childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[1].childNodes[3].childNodes[5];
  submitButton=parentElement.childNodes[1].childNodes[5].childNodes[1];
  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  submitButton.innerHTML="Save Changes";
  submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
};



const saveEdit=(event)=>{
  const targetID=event.target.getAttribute("name");
  const elementType=event.target.tagName;

  let taskTitle;
  let TaskType;
  let taskDescription;
  let parentElement;
  let submitButton;
  if(elementType==="BUTTON"){
    parentElement=event.target.parentNode.parentNode.parentNode;

  }

  else{
    parentElement=event.target.parentNode.parentNode.parentElement.parentNode;
  }
  taskTitle=parentElement.childNodes[1].childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[1].childNodes[3].childNodes[5];
  submitButton=parentElement.childNodes[1].childNodes[5].childNodes[1];

  const updatedData={
    title:taskTitle.innerHTML,
    description:taskDescription.innerHTML,
  };

  globalTaskData.forEach((task)=>{
    if(task.id===targetID){
      return {...task,...updatedData};
    }
    else{
      return task;
    }
  })

  localStorage.setItem("taskyCA", JSON.stringify({ cards: globalTaskData }));
  taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  submitButton.innerHTML="View Task";
};
