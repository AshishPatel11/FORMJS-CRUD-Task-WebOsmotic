export default class Form {

  constructor(formContainerId, formData) {
    this.form = document.getElementById(formContainerId); //Container element from HTML in which you have to add form
    this.formObj = formData
    // Pass formContainerId to append form element inside of HTML DIV element
    // use formData to create form
    this.createForm()
    this.form.querySelectorAll("input, textarea, select ").forEach(input => {
      input.addEventListener("change", () => {
        const small = document.querySelector(`#${input.id} + small`)
        if (small)
          small.innerText = ""
        input.classList.remove("invalid-input")
      })
    })

  }
  // create methods/event to create form/ reset form/ submit form, etc

  //method for creating form
  createForm() {
    this.formObj.forEach(data => {
      const { attr, ...rest } = data
      const div = this.createElements("div", { class: "input-container" }, this.form)

      //Labels created except hidden inputs
      if (data.type !== "hidden") {
        const label = this.createElements("label", { for: data.attr ? data.attr.id : "", class: "label-text" }, div, data.label)
        if (data.attr ? data.attr.validate : null)
          this.createElements("small", { class: "validate" }, label, "*")
      }

      // switch cases for different type of input types
      switch (data.type) {
        //Textarea
        case "textarea":
          this.createElements("textarea", { ...attr, key: rest.key }, div)
          break;

        //Select list tag
        case "select": {
          const select = this.createElements("select", { ...attr, key: rest.key }, div)
          //options in select
          data.options.forEach(option => {
            this.createElements("option", { ...option }, select, option.innerText)
          })
          break;
        }

        //Radio button & checkbox
        case "radio":
        case "checkbox":
          data.options.forEach(option => {
            this.createElements("input", { ...option.attr, key: data.key, name: data.name, value: option.value, type: data.type }, div)
            this.createElements("label", { for: option.attr.id }, div, option.innerText)
          })
          break;

        //Reset button
        case "reset":
          this.createElements("input", { ...attr, ...rest, onclick: this.reset }, div)
          break;

        //Default
        default:
          this.createElements("input", { ...attr, ...rest }, div)
          break;
      }

      if (data.type !== "hidden") {
        this.createElements("small", { class: "error-text" }, div)
      }
    })
  }

  //method for setting the attributes or event to the given element 
  setAttributes(element, attributes) {
    for (const key in attributes) {
      if (["onclick", "onchange", "onsubmit"].includes(key))
        element.addEventListener(key.slice(2), attributes[key])
      else
        element.setAttribute(key, attributes[key])
    }
  }

  //Method for creating new element with attributes and appned to given parent
  createElements(tag, attributes, parent, innerText) {
    const element = document.createElement(tag)
    this.setAttributes(element, attributes)
    element.innerText = innerText ?? ""
    parent.appendChild(element)
    return element
  }

  //method for getting data from created form
  getFormData() {
    let userData = {}

    this.formObj.forEach(element => {
      switch (element.type) {
        case "hidden": {
          const hidden = document.querySelector(`input[key=${element.key}]`)
          userData = { ...userData, [element.key]: hidden.value ? hidden.value : element.getValue() }
          break;
        }
        case "radio": {
          const radio = document.querySelector(`input[key=${element.key}]:checked`)
          if (radio)
            userData = { ...userData, [element.key]: radio.value }
          break;
        }
        case "checkbox": {
          const checkboxs = document.querySelectorAll(`input[key=${element.key}]:checked`)
          if (checkboxs) {
            const checkedArray = [...checkboxs].map(checkbox => checkbox.value)
            userData = { ...userData, [element.key]: checkedArray }
          }
          break;
        }
        case "submit":
        case "reset":
          break;
        default:
          userData = { ...userData, [element.key]: document.getElementById(`${element.attr.id}`).value.trim() }
          break;
      }
    })
    return userData
  }

  //method for filling the form with provided data
  updateForm(data) {
    this.reset()
    for (const key in data) {
      const input = this.form.querySelectorAll(`input[key=${key}],select[key=${key}],textarea[key=${key}]`)
      this.form.querySelector("input[type=submit]").value = "Save"
      if (input[0].type === "radio") {
        input[[...input].findIndex(inp => inp.value === data[key])].checked = true
      } else if (input[0].type === "checkbox") {
        data[key].forEach(elem => {
          input[[...input].findIndex(inp => inp.value === elem)].checked = true
        })
      } else {
        input[0].value = data[key]
      }
    }
  }

  //method for onclick reset button and resetting the form
  reset = () => {
    this.form.reset()
    this.form.querySelectorAll("input[type=hidden]").forEach(elem => {
      elem.value = ""
    })
    this.form.querySelector("input[type=submit]").value = "Submit"

    const inputs = this.form.querySelectorAll("input, textarea, select ")
    inputs.forEach(input => {
      if (input.getAttribute("validate")) {
        const small = document.querySelector(`#${input.id} + small`)
        if (small) {
          small.innerText = ""
          input.classList.remove("invalid-input")
        }
      }
    })
  }

  //returns true if the form is in the update state
  isUpdate() {
    return this.form.querySelector("#user-id").value
  }

  validate() {
    const inputs = this.form.querySelectorAll("input, textarea, select ")
    let validate = true
    inputs.forEach(input => {
      if (input.getAttribute("validate")) {
        if (!input.value) {
          validate = false
          document.documentElement.scrollTop = 0;
          const small = document.querySelector(`#${input.id} + small`)
          small.innerText = "Please Enter The Value!"
          input.classList.add("invalid-input")
        }
      }
    })
    if (!validate) {
      alert("Please fill the marked fields!")
    }
    return validate
  }

}

