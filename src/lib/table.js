export default class Table {

  constructor(tableContainerId, headers) {
    this.container = document.getElementById(tableContainerId); // Use this container to create table inside of it
    // Pass tableContainerId to append table inside of HTML DIV element
    this.headings = headers
    this.updateEvent = new Event("update")
    this.deleteEvent = new Event("delete")
    this.table = null
    this.updateRecordId = null
    this.deleteRecordId = null
    this.caption = null
    this.len = 0
  }
  // create methods/event to refresh table data, add data row, update data row, delete data row, etc

  //Method for creating the table with given data
  createTable(data) {
    //outer format of table
    this.len = data.length
    this.caption = this.createElements("tr", { class: "caption" }, this.container, `Total Records:- ${this.len}`)
    this.table = this.createElements("table", { class: "table" }, this.container)
    const thead = this.createElements("thead", {}, this.table)
    const tbody = this.createElements("tbody", {}, this.table)
    const theadTr = this.createElements("tr", {}, thead)
    //creating the headings for table
    this.headings.forEach(header => {
      this.createElements("th", {}, theadTr, header)
    })

    //initial data of the table
    if (data) {
      data.forEach(record => {
        this.createTr(record, tbody)
      })
    }
    return this.table
  }

  //Method for creating TR element with given record and parent node
  createTr(record, node) {
    const tr = this.createElements("tr", {}, node)
    this.headings.forEach(header => {
      if (header === "action") {
        const td = this.createElements("td", {}, tr,)
        this.createElements("button", { class: "btn btn-primary edit-btn", id: `${record.userId}`, onclick: this.edit }, td, "Update")
        this.createElements("button", { class: "btn btn-danger delete-btn", id: `${record.userId}`, onclick: this.delete }, td, "Delete")
      } else {
        this.createElements("td", {}, tr, record[header.replace(" ", "_")])
      }
    })
    return tr
  }

  //Method for setting one or more attributes
  setAttributes(element, attributes) {
    for (const key in attributes) {
      if (["onclick", "onchange", "onsubmit"].includes(key))
        element.addEventListener(key.slice(2), attributes[key])
      else
        element.setAttribute(key, attributes[key])
    }
  }

  // Method for creating new HTML element
  createElements(tag, attributes, parent, innerText) {
    const element = document.createElement(tag)
    this.setAttributes(element, attributes)
    element.innerText = innerText ?? ""
    if (parent)
      parent.appendChild(element)
    return element
  }

  //edit button event
  edit = (event) => {
    this.updateRecordId = Number(event.target.id)
    this.table.dispatchEvent(this.updateEvent)
  }

  //delete button event
  delete = (event) => {
    this.deleteRecordId = Number(event.target.id)
    this.table.dispatchEvent(this.deleteEvent)
  }

  //method for appending row in table
  appendRow(data) {
    this.len += 1
    this.createTr(data, this.container.querySelector(`tbody`))
    this.caption.innerText = `Total Records:- ${this.len}`
  }

  //method for replacing row by given index
  replaceRow(index, data) {
    const tbody = this.table.querySelector('tbody')
    tbody.replaceChild(this.createTr(data), tbody.querySelectorAll('tr')[index])
  }

  //method for deleting row by given index
  deleteRow(index) {
    this.len -= 1
    const tbody = this.table.querySelector('tbody')
    tbody.removeChild(tbody.querySelectorAll('tr')[index])
    this.caption.innerText = `Total Records:- ${this.len}`
  }

}

