const baseURL = "http://0.0.0.0:8088";

const APIManager = {
    getAll: function(url) {
        return fetch(url)

    },
  getOnePlace: function (url, id) {
    return fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(parsedResults => {
        console.log("this is a single obj", parsedResults)
        return parsedResults
      });
  },
  savePlace: function (url, object) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json())
      .then(savedData => {
        console.log("this is savedData", savedData)
      });
  },
  deletePlace: function (url, Id) {
    return fetch(`${url}/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(console.log("succesfully deleted"));
  },
  editPlace: function (url, id, object) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json())
      .then(editedDated => {
        console.log("this is edited stuff", editedDated)
      });
  },
  editPatch: function (url, id, object) {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json())
      .then(editedDated => {
        console.log("this is edited stuff", editedDated)
      });
  }
}

export default APIManager;
