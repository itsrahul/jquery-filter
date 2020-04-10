export default class Contact
{
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  static validateInput(name, email)
  {
    const pattern = /^\w{3,}@\w{3,}[.][a-zA-Z]{2,}$/;
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