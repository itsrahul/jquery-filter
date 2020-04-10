import Contact from "./Contact.js";
import GridView from "./GridView.js";
import ListView from "./ListView.js";

export default class ContactManager
{
  constructor(options)
  {
    this.$displayElement          = options.$displayElement;
    this.$formElement             = options.$formElement;
    this.$nameInputElement        = options.$formElement.find(options.nameInputElement);
    this.$emailInputElement       = options.$formElement.find(options.emailInputElement);
    this.$searchInputElement      = options.$formElement.find(options.searchInputElement);
    this.$switchViewButtonElement = options.$formElement.find(options.switchViewButtonElement);
    this.$addButtonElement        = options.$formElement.find(options.addButtonElement);
    this.searchByAttribute        = options.searchByAttribute;
    this.uniqueID                 = new Set();
    this.contactList              = [];
    this.filteredContacts         = [];
    this.gridView                 = new GridView(this);
    this.listView                 = new ListView(this);
    this.currentView              = 'list';
    
    // contacts > filter > filteredContacts > pass to current view to display
  }

  init()
  {
    this.bindEvents();
  }

  bindEvents()
  {
    this.$addButtonElement.on("click", (event) => {
      event.preventDefault();
      this.onClickAdd();
    });
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