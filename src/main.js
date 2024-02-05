// formData is accessible here as we have global variable in formData.js
import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {
    // formContainerId, storageId, tableContainerId will be in argument of constructor
    // start code to init and link form.js, storage.js, table.js

    const headers = ["userId", "created at", "name", "email", "phone", "address", "street address", "city", "state", "pin code", "country", "gender", "hobbies", "action"]
    const frm = new Form(formContainerId, formData); // form js class to create form and access its methods
    const storage = new Storage(storageId); // storage class to access storage methods
    const tbl = new Table(tableContainerId, headers); // table js class to create table and access its methods


    //creating the table with data
    const table = tbl.createTable(storage.getData())

    //onsubmit of the form created
    frm.form.addEventListener("submit", (event) => {
      event.preventDefault()
      const userData = frm.getFormData()
      if (frm.isUpdate()) {
        const index = storage.update(userData)
        tbl.replaceRow(index, userData)
      } else {
        storage.insert(userData)
        tbl.appendRow(userData)
      }
      frm.reset()
    })

    //custom event listner for update
    table.addEventListener("update", () => {
      const updateData = storage.getData(tbl.updateRecordId)
      frm.updateForm(updateData)
    })

    //custom eventlistner for delete
    table.addEventListener("delete", () => {
      frm.reset()
      const index = storage.delete(tbl.deleteRecordId)
      if (index !== null)
        tbl.deleteRow(index)
    })
  }
}
//formContainerId: HTML Div element id inside of which you want to create form4
// formContainerId -> #employeeForm of current index.html

// storageId: localStorage key for saving json  string data init
// storageId -> 'employeeData' simple string to selected as key of localStorage

//tableContainerId: HTML Div element id inside of which you want to create table
// tableContainerId -> #tableDiv of current index.html

const main = new Main('employeeForm', 'employeeData', 'tableDiv');