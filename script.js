
const main_container = document.getElementById("main-container");
const add_note = document.getElementById("add-new-note");
const add_note_container = document.getElementById("add-note-container");
const return_main = document.getElementById("return-to-main");
const save_note = document.getElementById("save-note");
const title_input = document.getElementById("title");
const title_error = document.getElementById("error-title");
const description_input = document.getElementById("description");
const description_error = document.getElementById("error-desciption");
const notes_container = document.getElementById("notes-container");
const searchKey = document.getElementById("search-key");
const notesBtn = document.getElementById("notes-button");

homePage();
localStorage.clear()

notesBtn.addEventListener("click", () =>{
     notes_container.innerHTML = '';
    homePage();
});


add_note.addEventListener("click",() => {
    main_container.className = "container hidden";
    add_note_container.className = "write-note-container";
});

return_main.addEventListener("click", () =>{
        main_container.className = "container";
add_note_container.className = "write-note-container  hidden";
});

save_note.addEventListener("click", () => {
   var isvalide =  inputValidation();
   if(isvalide){
       const note = saveToLocalStorage();
       addToNotesList(note);
   }
     main_container.className = "container";
    add_note_container.className = "write-note-container  hidden";
    myFunction()
    

});

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function inputValidation(){
    var title_condition = title_input.value.length >= 5;
    var description_condition = description_input.value.length >= 10;
    title_error.className = title_condition ? "error-message hidden" : "error-message";
    description_error.className = description_condition ? "error-message hidden" : "error-message";

    var isValide = title_condition && description_condition;
    return isValide;  
}

function saveToLocalStorage(){
    const date = new Date();
    const time = (date.getHours() > 12 ? date.getHours()-12 + ":" + date.getMinutes() + "PM"
        : date.getHours() + ":" + date.getMinutes() + "AM" )  
        + ", " + date.toLocaleString("en-US", { month: "long" }) +" " + date.getDate() + ", " + date.getFullYear();

    const notesStored = JSON.parse(localStorage.getItem("notesStored"));
    const  notesList = notesStored==null ? [] : notesStored;
    const note = {
        id: notesList.length,
        title: title_input.value,
        description: description_input.value,
        date: time
    }
    notesList.push(note);
    localStorage.setItem("notesStored", JSON.stringify(notesList));
    return note;
}
function addToNotesList(note){
    const noteChild = document.createElement("div");
        noteChild.className= "note";
        noteChild.innerHTML = `
          
                <h3 class="header">${note.title}</h3>
                <p class="description">${note.description}</p>
                <p><small>${note.date}</small></p>
             
        `;
         notes_container.appendChild(noteChild);

}

function homePage(){
    const notesStored = JSON.parse(localStorage.getItem("notesStored"));
    const  notesList = notesStored==null ? [] : notesStored;

    for(let i=0; i < notesList.length; i++){
        const noteChild = document.createElement("div");
        noteChild.className= "note";
        noteChild.innerHTML = `
          
                <h3 class="header">${notesList[i].title}</h3>
                <p class="description">${notesList[i].description}</p>
                <p><small>${notesList[i].date}</small></p>
             
        `;

        notes_container.appendChild(noteChild);
    }
    main_container.className = "container";
    add_note_container.className = "write-note-container  hidden";
}


function SerachMeal(){
    notes_container.innerHTML = '';

    const filter = searchKey.value.toLowerCase();
      const notesStored = JSON.parse(localStorage.getItem("notesStored"));
    const  mealsList = notesStored==null ? [] : notesStored;
   
    for(let i=0; i<mealsList.length; i++){
        const titleE = mealsList[i].title.toLowerCase();
        const desciptionE = mealsList[i].description.toLowerCase();
        if((titleE.indexOf(filter) > -1) || (desciptionE.indexOf(filter) > -1)){
            addToNotesList(mealsList[i])
        }
    }
    if (notes_container.innerHTML == ''){
        const noMeal = document.createElement("div");
        noMeal.innerHTML = `<h3 style="text-align:center;">No Meal Found</h3> `;
        notes_container.appendChild(noMeal);
       
    }
    // alert(searchKey.value);

}
