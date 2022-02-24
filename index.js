
const taskContainer=document.querySelector(".task_container");

const addNewCard=()=>{

    const card={
        id:`${Date.now}`,
        image:document.getElementById("TaskImageURL").value,     
        title:document.getElementById("TaskTitle").value,
        type:document.getElementById("TaskType").value,
        description:document.getElementById("description" ).value,
    };
    console.log(card);




//generate HTML code for new card

const newCard=`<div id=${card.id} class="col col-md-6 col-lg-4 ms-2 ">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button class="btn btn-outline-info">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
   <button class="btn btn-outline-danger">
     <i class="fa fa-trash-o" aria-hidden="true"></i>
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

taskContainer.insertAdjacentHTML("afterend",newCard);


//clear the form
document.getElementById("TaskImageURL").value=""
document.getElementById("TaskTitle").value=""
document.getElementById("TaskType").value=""
document.getElementById("description" ).value=""


};


