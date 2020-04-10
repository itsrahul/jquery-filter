import Display from './Display.js';

export default class GridView extends Display
{
  constructor(managerObject)
  {
    super(managerObject);
  }

  displayContacts()
  {
    let contactArray = super.displayContacts();
    contactArray.forEach((contact) => {
      let delButton =
      $("<button>", { id: 'delete'})
      .text("Delete")
      .on("click", () => Display.deleteContactCard(this.manager, contact) );
      
      let itemDiv = $("<div data-name=>").addClass("grid").append(`Name: ${contact.name}<br>Email: ${contact.email}<br>`);
      Display.view(this.manager, itemDiv, contact, delButton);
    });
  }
}
