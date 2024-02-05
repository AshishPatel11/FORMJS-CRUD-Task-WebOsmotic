export default class Storage {
  constructor(storageId) {
    this.storageId = storageId; // use this.storageId with localStorage as a unique key to store data
    // Pass storageId to save json string data after each operation in localStorage
    // local storageId is important to retrieve old saved data
  }
  // create methods to perform operations like save/edit/delete/add data

  //method for storing data in localstorage as string
  set(data) {
    return localStorage.setItem(this.storageId, JSON.stringify(data))
  }

  //insert a new record in existing data
  insert(data) {
    const oldData = this.getData()
    oldData.push(data);
    // return localStorage.setItem(this.storageId, JSON.stringify(oldData))
    return this.set(oldData)
  }

  //returns the specific record or all records
  getData(dataId) {
    if (dataId) {
      const storageData = JSON.parse(localStorage.getItem(this.storageId)) ?? []
      return storageData.find(data => data.userId == dataId)

    } else {
      return JSON.parse(localStorage.getItem(this.storageId)) ?? []
    }
  }

  //updates the specific data
  update(data) {
    const records = this.getData()
    const index = records.findIndex(record => Number(record.userId) === Number(data.userId))
    records.splice(index, 1, data)
    this.set(records)
    return index
  }

  //delete the specific record by given userId
  delete(id) {
    const records = this.getData()
    const index = records.findIndex(record => Number(record.userId) === Number(id))
    if (confirm("Do you want to delete this record permanently??")) {
      records.splice(index, 1)
      this.set(records)
      return index
    }
    else {
      return null
    }
  }
}
