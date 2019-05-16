import domBuileder from "./domBuilder";
const event = {
eventsReset(){
    domBuileder.createEventForm()
     domBuileder.createOutput()
},
clearDOM() {
    //Clear output divs
    let output = document.querySelector(".output")
    output.innerHTML = ""
}}
export default event