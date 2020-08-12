function removeField(element){

    const scheduleList = document.querySelector("#schedule-items")
    const itemToRemove = element.parentElement.parentElement

    const nextElementSibling = itemToRemove.nextElementSibling
    const previousElementSibling = itemToRemove.previousElementSibling

    var isOnlyChield = true

    if(nextElementSibling && itemToRemove.className == nextElementSibling.className){
        isOnlyChield = false
    }

    if(previousElementSibling && itemToRemove.className == previousElementSibling.className){
        isOnlyChield = false
    }

    if(!isOnlyChield){
        scheduleList.removeChild(itemToRemove)
    }

}