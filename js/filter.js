import ContactManager from "./ContactManager.js";

$(document).ready(function() {
  let options  = {
    $displayElement: $("#result"),
    $formElement: $("#myForm"),
    nameInputElement: "input[id=name]",
    emailInputElement: "input[id=email]",
    searchInputElement: "input[id=search]",
    addButtonElement: "button[id=add]",
    switchViewButtonElement: "button[id=switchView]",
    searchByAttribute: "data-name",
  };
  let filter = new ContactManager(options);
  filter.init();
});