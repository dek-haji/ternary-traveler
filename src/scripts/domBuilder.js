import APIManager from "./dbCalls"
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
            <section class="auth hidden">
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
              <section class="location">
              <fieldset>
                  <label for="location"> Place</label>
                  <select id = "scroll">
                      <option value = ${parsedPlaces[0].id}>${parsedPlaces[0].name}</option>
                      <option value = ${parsedPlaces[1].id}>${parsedPlaces[1].name}</option>
                      <option value = ${parsedPlaces[2].id}>${parsedPlaces[2].name}</option>
                  </select> </br>
                  <button id ="submit"> Safe </button>
          </section>
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
                    })
                    outputForm.appendChild(card)

                });
            })

    }
}


export default domBuileder