// When user bind any event like click, onChange, onblur all callback will have [e, obj, array, dataObjArray] arguments.
const formData = [
  {
    type: 'hidden',
    key: 'userId',
    label: 'User Id',
    unique: true,
    value: "",
    getValue: function () {
      // this.value = JSON.stringify({ [this.key]: Math.floor(100000 + Math.random() * 900000) })
      // when user will use type hidden in formData object at that time we don't have to add any input element in form but we should notify or give error to user in console if user has not mentioned getValue function.
      // getValue function will only have current form data in form of object key value pair
      // first condition is to check if userId is present then use it because we only want to set userId for new records
      return Math.floor(100000 + Math.random() * 900000);
    },
    attr: {
      class: "user id",
      id: "user id"
    }
  },
  {
    type: 'hidden',
    key: 'created_at',
    label: 'Created At',
    getValue: function () {
      // first condition is to check if createdAt is present then use it as we only want to set createdAt while creating new records
      return new Date().toLocaleString("en-IN");
    },
  },
  {
    type: 'text',
    label: 'Name ',
    key: 'name',
    value: '',
    // attr is option, User can add new html element properties to it or user can remove all properties like empty object  attr: {}
    attr: {
      pattern: '[ A-Za-z ]{1,16}',
      title: "Enter alphabets only with maximum length of 32 char.!",
      id: 'txtName1',
      class: 'form-control textInput',
      placeholder: 'Enter name',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'email',
    label: 'Email ',
    key: 'email',
    value: '',
    attr: {
      id: 'txtEmail',
      class: 'form-control textInput',
      placeholder: 'Enter email',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'tel',
    label: 'Phone ',
    key: 'phone',
    value: '',
    attr: {
      validate: true,
      pattern: "[0-9]{10}",
      title: "Phone number with 10 digits!",
      placeholder: 'Enter Phone Number',
      id: 'txtPhone',
      class: 'form-control',
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      },
    },
  },
  {
    type: 'textarea',
    label: 'Address ',
    key: 'address',
    value: '',
    attr: {
      id: 'txtAddress',
      class: 'form-control textInput',
      placeholder: 'Enter Address',
      rows: '5',
      name: 'txtName',
      validate: true, //Add validation for validate field
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'Street Address ',
    key: 'street_address',
    value: '',
    attr: {
      id: 'txtStreet',
      class: 'form-control textInput',
      placeholder: 'Enter Street Address',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'City ',
    key: 'city',
    value: '',
    attr: {
      id: 'txtCity',
      class: 'form-control textInput',
      placeholder: 'Enter City',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'State ',
    key: 'state',
    value: '',
    attr: {
      id: 'txtState',
      class: 'form-control textInput',
      placeholder: 'Enter State',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'number',
    label: 'Pin Code ',
    key: 'pin_code',
    value: '',
    attr: {
      id: 'txtPincode',
      class: 'form-control textInput',
      placeholder: 'Enter Pin Code',
      name: 'txtName',
      validate: true,
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'select',
    label: 'Country ',
    key: 'country',
    value: [],
    attr: {
      id: 'txtCountry',
      name: 'country',
      validate: true,
      class: 'form-select columns',
      onchange: function () {
        if (!this.checkValidity())
          this.classList.add("invalid-input")
        else
          this.classList.remove("invalid-input")
      }, // e, obj, array, dataObjArray you will get in function argument
    },
    options: [
      {
        innerText: 'Select Country',
        hidden: true,
        value: '',
      },
      {
        innerText: 'India',
        value: 'India',
      },
      {
        innerText: 'United States',
        value: 'United States',
      },
      {
        innerText: 'Sri Lanka',
        value: 'Sri Lanka',
      },
    ],
  },
  {
    type: 'radio',
    label: 'Gender ',
    key: 'gender',
    value: '',
    options: [
      {
        innerText: 'Male',
        value: 'Male',
        name: 'gender',
        attr: {
          id: 'Male',
          class: 'form-check-input radioGender',
          checked: true,
          validate: true,
          onchange: function () { }, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Female',
        value: 'Female',
        name: 'gender',
        attr: {
          id: 'Female',
          class: 'form-check-input radioGender',
          validate: true,
          onchange: function () { }, // e, obj, array, dataObjArray you will get in function argument
        },
      },
    ],
  },
  {
    type: 'checkbox',
    label: 'Hobbies',
    key: 'hobbies',
    value: [],
    options: [
      {
        innerText: 'Swimming',
        value: 'Swimming',
        name: 'hobbies',
        attr: {
          id: 'Swimming',
          class: 'form-check-input radioHobbies',
          onchange: function () { }, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Singing',
        value: 'Singing',
        name: 'hobbies',
        attr: {
          id: 'Singing',
          class: 'form-check-input radioHobbies',
          onchange: function () { }, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Writing',
        value: 'Writing',
        name: 'hobbies',
        attr: {
          id: 'Writing',
          class: 'form-check-input radioHobbies',
          onchange: function () { }, // e, obj, array, dataObjArray you will get in function argument
        },
      },
    ],
  },
  {
    type: 'submit',
    attr: {
      id: 'btnSubmit',
      name: 'btnSubmit',
      class: 'btn btn-block btn-primary submit',
      value: 'Submit',
      onsubmit: function () {
        // e, obj, array, dataObjArray you will get in function argument
        // e:  its button native event
        // obj: current form data in object form
        // array: formData array
        // dataObjArray: localstorage all data from storage.js
      },
    },
  },
  {
    type: 'reset',
    attr: {
      id: 'btnReset',
      name: 'btnReset',
      class: 'btn btn-block btn-danger reset',
      value: 'Reset',
      onclick: function () {

      }, // e, obj, array, dataObjArray you will get in function argument
    },
  },
];

export default formData;