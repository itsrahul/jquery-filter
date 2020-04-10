import Display from './Display.js';
// console.log('Display :', Display);

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
      
      // FIXME_AB: use the right syntax
      let itemDiv = $("<div data-name=>").addClass("grid").append(`Name: ${contact.name}<br>Email: ${contact.email}<br>`);
      Display.view(this.manager, itemDiv, contact, delButton);
    });
  }
}
