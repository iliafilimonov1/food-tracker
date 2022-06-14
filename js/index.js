import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";

// * Start by importing the FetchWrapper and instantiating it.
// * Copy the Base URL and pass it as the first (and only) argument to new FetchWrapper().
// * Replace {namespace} with any word you'd like. Try to remember this for future projects.
// * Use document.querySelector to find the form, name, carbs, protein, and fat from the DOM.
// * Add a submit event handler on the form and prevent the default action when the form is submitted.
// * Make the POST fetch request to / (this will be added to the Base URL) and use the Example Body from the API documentation. It contains hardcoded data, but that's okay for now.
// * Replace the hardcoded data with the form data provided by the user.
// * Clear the form by setting the .value equal to an empty string for every form item.
// * Experiment to find out what happens when the API fails. For example, try sending the data without a name.
// * Based on that, update your logic to only clear the form when the fetch request is successfully completed.

const API = new FetchWrapper(
    "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/YOURNAMESPACEHERE"
);

const list = document.querySelector("#food-list");
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    API.post("/", {
        fields: {
            name: { stringValue: name.value },
            carbs: { integerValue: carbs.value },
            protein: { integerValue: protein.value },
            fat: { integerValue: fat.value },
        },
    }).then((data) => {
        console.log(data);
        if (data.error) {
            // there was an error
            return;
        }

        list.insertAdjacentHTML(
            "beforeend",
            `<li class="card">
            <div>
              <h3 class="name">${capitalize(name.value)}</h3>
              <div class="calories">${calculateCalories(carbs.value, protein.value, fat.value)} calories</div>
              <ul class="macros">
                <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
                <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
                <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
              </ul>
            </div>
          </li>`
        );

        name.value = "";
        carbs.value = "";
        protein.value = "";
        fat.value = "";
    });
});