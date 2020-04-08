class Filter
{
  constructor(details)
  {
    this.$displayElement = details.$displayElement;
    this.$nameElement = details.$nameElement;
    this.$emailElement = details.$emailElement;
    this.$searchElement = details.$searchElement;
    this.$buttonElement = details.$buttonElement;
    this.searchByAttribute = details.searchByAttribute;
    this.$itemDiv = details.$itemDiv;
    this.uniqueID = new Set();
  }
  start()
  {
    this.addOnClick();
    this.addSearch();
  }

  addOnClick()
  {
    this.$buttonElement.on("click", () => {
      let nameVal = this.$nameElement.val();
      let emailVal = this.$emailElement.val();
      if(Contact.validateInput(nameVal, emailVal))
      {
        this.createContact(nameVal, emailVal);
      }
    })
  }

  addSearch()
  {
    this.$searchElement.on("keyup", () => {
      this.filterContact($(event.target).val());
    })
  }

  filterContact(searchVal)
  {
    let $contacts = this.$displayElement;
    $contacts.children().hide();
    
    if(searchVal == "")
    {
      $contacts.children().show();
    }
    else
    {
      this.$displayElement.find(`[${this.searchByAttribute}^=${searchVal}]`).show();      
    }
  }
  
  createContact(name, email)
  {
    if(this.uniqueID.has(email))
    {
      window.alert("Contact with same email")
    }
    else
    {
      this.uniqueID.add(email);
      let user = new Contact(name, email);
      View.createViewCard(this, user);
    }
  }
}

class View
{
  static createViewCard(obj, contact)
  {
    let nameText = `Name: ${contact.name} `;
    let emailText = `Email: ${contact.email}`;
    let delButton = 
      $("<br><button id=delete>")
        .text("Delete")
        .on("click", () => View.deleteContactCard() );

    let newDiv = obj.$itemDiv
      .clone()
      .text(nameText + emailText)
      .attr(obj.searchByAttribute, contact.name)
      .append(delButton);

    obj.$displayElement.append(newDiv);

  }

  static deleteContactCard()
  {
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
    return (name!= null && email != null && result!= null) ? true : false;
  }

}

$(document).ready(function() {
  let details  = {
    $displayElement: $("#result"),
    $nameElement: $("input[id=name]"),
    $emailElement: $("input[id=email]"),
    $searchElement: $("input[id=search]"),
    $buttonElement: $("button[id=add]"),
    searchByAttribute: 'data-name',
    $itemDiv: $("<div data-name=>").addClass("item"),
  };
  
  let filter = new Filter(details);
  filter.start();
});
