import APIManager from "./dbCalls"
import event from "./events"
let interestURL = "http://localhost:8088/interests"
let placeURL = "http://localhost:8088/places"

const domBuileder = {
    createEventForm() {
        let travel = document.querySelector(".input");
        APIManager.getAll(placeURL)
            .then(response => response.json())
            .then(parsedPlaces => {
                console.log(parsedPlaces)


                travel.innerHTML = `<div
            <form class="auth hidden">
            <fieldset>
              Name:
              <input class="username__Input" type="text" name="nameIntrest"> </br>
              </fieldset>
              <fieldset>
              Description:
              <input class="description" type="text" name="desc"> </br>
              </fieldset>
              <fieldset>
              Cost:
              <input class="cost" type="text" name="cost"> </br>
              </fieldset>
              <fieldset>
              Review:
              <input class="review" type="text" name="review"> </br>
              </fieldset>
              <fieldset>
                  <label for="location"> Place</label>
                  <select id = "scroll">
                      <option value = ${parsedPlaces[0].id}>${parsedPlaces[0].name}</option>
                      <option value = ${parsedPlaces[1].id}>${parsedPlaces[1].name}</option>
                      <option value = ${parsedPlaces[2].id}>${parsedPlaces[2].name}</option>
                  </select> </br>
                  <button id ="submit"> Safe </button>
                  </form>
                  </div>`
                this.addListener()
            })
    },
    addListener() {
        document.querySelector("#submit").addEventListener("click", (e) => {
            let interestName = document.querySelector(".username__Input").value
            let descInput = document.querySelector(".description").value
            let costInput = document.querySelector(".cost").value
            let locationInput = document.querySelector("#scroll").value
            let reviewInput = document.querySelector(".review").value
            console.log(interestName, descInput, costInput, locationInput)
            const interestObj = {
                "name": interestName,
                "description": descInput,
                "cost": costInput,
                "review": reviewInput,
                "placeId": parseInt(locationInput)
            }
            APIManager.savePlace(interestURL, interestObj)
                .then(after => {
                    this.createOutput()
                    event.clearDOM()
                })
        })
    },
    createOutput() {
        APIManager.getAll(interestURL)
            .then(response => response.json())
            .then(parsedResults => {
                parsedResults.forEach(singleInterest => {
                    console.log("single", singleInterest)
                    let ID = singleInterest.id
                    let outputForm = document.querySelector(".output")
                    let card = document.createElement("section")
                    card.setAttribute("id", "interest")

                    let name = document.createElement("h2")
                    name.innerText = singleInterest.name;
                    card.appendChild(name)

                    const description1 = document.createElement("h3")
                    description1.innerText = singleInterest.description
                    card.appendChild(description1)

                    const cost = document.createElement("h4")
                    cost.innerText = singleInterest.cost
                    card.appendChild(cost)

                    let review = document.createElement("h5")
                    review.innerText = singleInterest.review
                    card.appendChild(review)

                    let deletBtn = document.createElement("button")
                    deletBtn.innerText = "DELETE";
                    card.appendChild(deletBtn)

                    deletBtn.addEventListener("click", () => {
                        APIManager.deletePlace(interestURL, ID)
                        let parent = card.parentNode
                        parent.removeChild(card)

                    })
                    //EDIT BUTTON and event listeners
                    let editInput1 = document.createElement("input")
                    let editInput2 = document.createElement("input")
                    let editInput3 = document.createElement("input")
                    let editInput4 = document.createElement("input")

                    editInput1.className = "edit-input1"
                    editInput2.className = "edit-input2"
                    editInput3.className = "edit-input3"
                    editInput4.className = "edit-input4"

                    editInput1.placeholder = singleInterest.name;
                    editInput2.placeholder = singleInterest.description;
                    editInput3.placeholder = singleInterest.cost;
                    editInput4.placeholder = singleInterest.review;

                    let editInterest = document.createElement("button")
                    editInterest.classList.add("edit-events")
                    editInterest.classList.add("btn-outline-warning")
                    editInterest.textContent = "Edit"
                    editInterest.addEventListener("click", function (e) {

                        //Hide the edit button to prevent reclicks
                        this.style.display = "none"
                        //Add Save and Cancel Buttons Inside  DIV for styling
                        let editOptions = document.createElement("div")
                        editOptions.className = "edit-options"
                        let save = document.createElement("button")
                        save.textContent = "UPDATE"
                        save.classList.add("btn-outline-info")
                        save.addEventListener("click", function (e) {
                            //console.log(editInput)
                            let obj = {
                                name: editInput1.value,
                                description: editInput2.value,
                                cost: editInput3.value,
                                review: editInput4.value
                            }
                            console.log(obj)

                            APIManager.editPatch(interestURL, ID, obj)
                                .then(results => {
                                    console.log(results)
                                    event.eventsReset()
                                })
                        })
                        editOptions.appendChild(save)
                        let parent = editInterest.parentNode
                        parent.appendChild(editInput1)
                        parent.appendChild(editInput2)
                        parent.appendChild(editInput3)
                        parent.appendChild(editInput4)
                        parent.appendChild(editOptions)
                    })
                    card.appendChild(editInterest)

                    deletBtn.textContent = "REMOVE";
                    editInterest.textContent = "EDIT"
                    deletBtn.classList.add("btn-outline-success")
                    card.appendChild(deletBtn)
                    card.appendChild(editInterest)
                    outputForm.appendChild(card)
                })

            }
            )}
}



export default domBuileder