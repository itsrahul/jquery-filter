export default class Display
{
  constructor(managerObject)
  {
    this.manager = managerObject;
  }

  static view(manager, itemDiv, contact, delButton)
  {
    
    let newDiv = itemDiv
      .clone()
      .attr(manager.searchByAttribute, contact.name)
      .append(delButton);

    manager.$displayElement.append(newDiv);
  }
  
  static deleteContactCard(manager, contact)
  {
    let index = manager.contactList.indexOf(contact);
    manager.contactList.splice(index,1);
    manager.uniqueID.delete(contact.email);
    $(event.target).parent().remove();
  }

  displayContacts()
  {
    let contactArray = null;
    if(this.manager.filteredContacts == null)
    {
      contactArray = this.manager.contactList;
    }
    else
    {
      contactArray = this.manager.filteredContacts;
    }

    this.manager.$displayElement.children().detach();

    return contactArray;    
  }
}