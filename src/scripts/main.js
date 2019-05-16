import APIManager from "./dbCalls";
import domBuilder from "./domBuilder"
const travelURL = "http://localhost:8088/interests";
const placesURL = "http://0.0.0.0:8088/places"
//testing import of dbcalls and calling getAllPlaces
// APIManager.getAllPlaces()
//     .then((places) => {
//         console.log("Oh the places you will go:", places);
//     });
//APIManager.getOnePlace(travelURL, 1)
// APIManager.getAllPlaces(placesURL)
domBuilder.createOutput()
domBuilder.createEventForm()