// MIXIN FOR PEOPLE DATA AND VALIDATION
const PersonData = {
    data() {
        var CheckEmail = (rule, value, callback) => {
            if (value !== "") {
                if (
                    !value.match(
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                ) {

                    return callback(new Error("E-mail address format is invalid."));
                }

                for (var x = 0; x < this.tableEmails.length; x++) {
                    if (value == this.tableEmails[x].email) {
                        return callback(new Error("E-mail address already inserted."));
                    }
                }

                callback();
            }
        }

        var CheckPhoneNumber = (rule, value, callback) => {
            if (value !== "") {
                if (
                    !value.match(
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                    )
                ) {

                    return callback(new Error("Phone number format is invalid."));
                }
                for (var x = 0; x < this.tablePhoneNumbers.length; x++) {
                    if (value == this.tablePhoneNumbers[x].phoneNumber) {
                        return callback(new Error("Phone number already inserted."));
                    }
                }
                callback();
            }
        }
        return {
            person: {
                data: {
                    firstName: "",
                    lastName: "",
                    birthday: ""
                },
                address: {
                    street: "",
                    postalCode: "",
                    city: "",
                    state: ""
                },
                phoneNumber: {
                    number: ""
                },
                email: {
                    description: ""
                }
            },
            tableAddresses: [],
            tablePhoneNumbers: [],
            tableEmails: [],
            savingPerson: false,
            rules:  // RULES FOR DATA DALIDATION IN FORMS
                {
                    personData: {
                        firstName: [
                            {
                                required: true,
                                message: "Please insert first name",
                                trigger: "blur"
                            },
                            {
                                min: 3,
                                max: 20,
                                message: "Length should be 3 to 5",
                                trigger: "blur"
                            }
                        ],
                        lastName: [
                            {
                                required: true,
                                message: "Please insert first name",
                                trigger: "blur"
                            },
                            {
                                min: 3,
                                max: 20,
                                message: "Length should be 3 to 5",
                                trigger: "blur"
                            }
                        ],
                        birthday: [
                            {
                                required: true,
                                message: "Please pick a birthday",
                                trigger: "blur"
                            }
                        ]
                    },
                    personAddress: {
                        postalCode: [
                            {
                                required: true,
                                message: "Please insert postal code",
                                trigger: "blur"
                            }
                        ],
                        street: [
                            {
                                required: true,
                                message: "Please insert street name",
                                trigger: "blur"
                            }
                        ],
                        city: [
                            {
                                required: true,
                                message: "Please insert city",
                                trigger: "blur"
                            }
                        ],
                        state: [
                            {
                                required: true,
                                message: "Please insert state",
                                trigger: "blur"
                            }
                        ]
                    },
                    personPhoneNumber: {
                        number: [
                            {
                                required: true,
                                message: "Please insert phone number"
                            },
                            {
                                validator: CheckPhoneNumber,
                                trigger: "blur"
                            }
                        ]
                    },
                    personEmail: {
                        description: [
                            {
                                required: true,
                                message: "Please insert e-mail",
                                trigger: "blur"
                            },
                            {
                                validator: CheckEmail,
                                trigger: "blur"
                            }
                        ]
                    }
                }
        }
    },
    methods: {

        AddAddressToTable() {
            this.$refs.formPersonAddress
                .validate()
                .then(valid => {
                    if (valid) {
                        this.tableAddresses.push({
                            street: this.person.address.street,
                            postalCode: this.person.address.postalCode,
                            city: this.person.address.city,
                            state: this.person.address.state
                        });
                    }
                })
                .catch(() => { });
        },
        AddPhoneNumberToTable() {
            this.$refs.formPersonPhoneNumber
                .validate()
                .then(valid => {
                    if (valid) {
                        this.tablePhoneNumbers.push({
                            number: this.person.phoneNumber.number
                        });
                    }
                })
                .catch(() => { });
        },
        AddEmailToTable() {
            this.$refs.formPersonEmail
                .validate()
                .then(valid => {
                    if (valid) {
                        this.tableEmails.push({
                            description: this.person.email.description
                        });
                    }
                })
                .catch(() => { });
        },
        DeletePhoneNumberTable(item) {
            var table = this.tablePhoneNumbers;

            for (let a = 0; a < table.length; a++) {
                if (table[a].number == item) {
                    table.splice(a, 1);
                }
            }
        },

        DeleteEmailTable(item) {
            var table = this.tableEmails;

            for (let a = 0; a < table.length; a++) {
                if (table[a].description == item) {
                    table.splice(a, 1);
                }
            }
        },
        ErrorValidationMessage() {
            this.$message({
                showClose: true,
                message: "The fields need to be filled correctly.",
                type: "error"
            });
        },
        ErrorAtLeastOnePhoneNumberMessage() {
            this.$message({
                showClose: true,
                message: "At least one phone number is required.",
                type: "error"
            });
        },
        ErrorAtLeastOneEmailMessage() {
            this.$message({
                showClose: true,
                message: "At least one e-mail address is required.",
                type: "error"
            });
        }

    }

}



export default PersonData;   