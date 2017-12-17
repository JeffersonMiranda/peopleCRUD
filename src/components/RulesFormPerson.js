// RULES FOR DATA DALIDATION IN FORMS
const rules = {
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
                validator: this.CheckPhoneNumber,
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
                validator: this.CheckEmail,
                trigger: "blur"
            }
        ]
    }
}

export default rules;