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
    },
    clearInput() {
        let name = document.querySelector(".username__input")
        let details = document.querySelector(".description")
        let cost = document.querySelector(".cost")
        let review = document.querySelector(".review")

        name.innerHTML = ""
        details.innerHTML = ""
        cost.innerHTML = ""
        review.innerHTML = ""

    }
}
export default event