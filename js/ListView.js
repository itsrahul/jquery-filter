import Display from "./Display.js";
// console.log('Display :', Display);

export default class ListView extends Display
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
      .text("X")
      .on("click", () => Display.deleteContactCard(this.manager, contact) );
      
      // FIXME_AB: use the right syntax
      let itemDiv = $("<div data-name=>").addClass("list").append(`<ul><li>Name: ${contact.name}<li> Email: ${contact.email}`);
      Display.view(this.manager, itemDiv, contact, delButton);
    });
  }
}
