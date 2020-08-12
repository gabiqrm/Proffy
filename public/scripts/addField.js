document.querySelector("#add-time").addEventListener("click",cloneField)

function cloneField(){
    const newField = document.querySelector(".schedule-item").cloneNode(true)
    const fieldList = newField.querySelectorAll("input")


    fieldList.forEach(function(field){
        field.value=""
    });

    document.querySelector("#schedule-items").appendChild(newField)

}