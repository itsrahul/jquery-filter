class ContactManager
{
  constructor(options)
  {
    this.$displayElement    = options.$displayElement;
    this.$formElement       = options.$formElement;
    //done FIXME_AB: nameInputElement, emailInput
    this.$nameInputElement       = options.$nameInputElement;
    this.$emailInputElement      = options.$emailInputElement;
    this.$searchInputElement     = options.$searchInputElement;
    //done FIXME_AB: addButtonElement
    this.$addButtonElement  = options.$addButtonElement;
    this.searchByAttribute  = options.searchByAttribute;
    this.uniqueID           = new Set();
    this.contactList        = [];
    this.filteredContacts   = [];
    this.gridView           = new GridView(this);
    this.listView           = new ListView(this);
    this.currentView        = 'list';
    
    this.$switchViewButtonElement = options.$switchViewButtonElement;
    
    // contacts > filter > filteredContacts > pass to current view to display
  }

  init()
  {
    this.bindEvents();
  }

  bindEvents()
  {
    this.$addButtonElement.on("click", () => this.onClickAdd());
    this.$searchInputElement.on("keyup", () => this.filterContact($(event.target).val()) );
    this.$switchViewButtonElement.on("click", () => this.onSwitchView() );
  }

  onSwitchView()
  {
    if (this.currentView == "list")
    {
      this.currentView = "grid"
      this.$displayElement.css('flex-direction', 'row');
    }
    else
    {
      this.currentView = "list";
      this.$displayElement.css('flex-direction', 'column');
    }

    this.filterContact(this.$searchInputElement.val());
  
  }

  onClickAdd()
  {
    {
      let nameVal = this.$nameInputElement.val();
      let emailVal = this.$emailInputElement.val();
      if(Contact.validateInput(nameVal, emailVal))
      {
        if(this.uniqueID.has(emailVal))
        {
          window.alert("Contact with same email")
        }
        else
        {
          this.uniqueID.add(emailVal);
          let user = new Contact(nameVal, emailVal);
          this.contactList.push(user);
          this.filterContact(this.$searchInputElement.val())
        }
      }
    }
  }

  filterContact(searchVal)
  {
    if(searchVal.trim() == "")
    {
      this.filteredContacts = null;
    }
    else
    {
      this.filteredContacts = this.contactList.filter((contact) => { return contact.name.match(searchVal) != null } );
    }

    if(this.currentView == 'grid')
    {
      this.gridView.displayContacts();
    }
    else if(this.currentView == 'list')
    {
      this.listView.displayContacts();
    }
  }
}

class GridView
{
  constructor(managerObject)
  {
    this.object = managerObject;
  }

  displayContacts()
  {
    let contactArray = null;
    if(this.object.filteredContacts == null)
    {
      contactArray = this.object.contactList;
    }
    else
    {
      contactArray = this.object.filteredContacts;
    }

    this.object.$displayElement.children().detach();

    for (let contact of contactArray)
    {
      let itemDiv1 = $("<div data-name=>").addClass("grid").append(`Name: ${contact.name}<br>Email: ${contact.email}<br>`);
      this.object.$displayElement.addClass("GridView").removeClass("ListView");
      Display.view(this.object, itemDiv1, contact);
    }
  }
}

class ListView
{
  constructor(managerObject)
  {
    this.object = managerObject;
  }

  displayContacts()
  {
    let contactArray = null;
    if(this.object.filteredContacts == null)
    {
      contactArray = this.object.contactList;
    }
    else
    {
      contactArray = this.object.filteredContacts;
    }

    this.object.$displayElement.children().detach();

    for (let contact of contactArray)
    {
      let itemDiv = $("<div data-name=>").addClass("list").append(`<ul><li>Name: ${contact.name}<li> Email: ${contact.email}`);
      this.object.$displayElement.addClass("ListView").removeClass("GridView");
      Display.view(this.object, itemDiv, contact);
    }
  }
}

class Display
{
  static view(object, itemDiv, contact)
  {
    let delButton =
      $("<button>", { id: 'delete'})
        .text("Delete")
        .on("click", () => Display.deleteContactCard(object, contact) );
    let newDiv = itemDiv
      .clone()
      .attr(object.searchByAttribute, contact.name)
      // .append($("<br>"))
      .append(delButton);

    object.$displayElement.append(newDiv);
  }
  
  static deleteContactCard(object, contact)
  {
    let index = object.contactList.indexOf(contact);
    object.contactList.splice(index,1);
    object.uniqueID.delete(contact.email);
    $(event.target).parent().remove();
  }
}


class Contact
{
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  static validateInput(name, email)
  {
    const pattern = /^\w{3,}@[a-zA-Z]{3,}[.][a-z]{2,}$/;
    let result = email.match(pattern);
    if(name.trim() == "")
    {
      window.alert("Name cannot be empty");
      return false;
    }
    else if(email.trim() == "")
    {
      window.alert("Email cannot be empty");
      return false;
    }
    else if(result == null)
    {
      window.alert("Please enter valid email");
      return false;
    }
    else
    {
      return true;
    }
  }
}

$(document).ready(function() {
  let options  = {
    $displayElement: $("#result"),
    $nameInputElement: $("#container input[id=name]"),
    $emailInputElement: $("#container input[id=email]"),
    $searchInputElement: $("#container input[id=search]"),
    $addButtonElement: $("#container button[id=add]"),
    $switchViewButtonElement: $("#container button[id=switchView]"),
    searchByAttribute: 'data-name',
  };
  let filter = new ContactManager(options);
  filter.init();
});
