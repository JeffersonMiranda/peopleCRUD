<template>
<div>

<el-row type="flex" justify="center"> 
  <el-col :span="22">
<el-tabs>
    <el-tab-pane label="Name">

    <el-form :model="person.data" :inline="true" class="demo-form-inline" :rules="rules.personData" ref="formPersonData">
    <el-form-item label="First Name" prop="firstName">
        <el-input  placeholder="John" v-model="person.data.firstName" ></el-input>
    </el-form-item>
     <el-form-item label="Last Name" prop="lastName">
        <el-input  placeholder="Silva" v-model="person.data.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Birthday" prop="birthday">
           <el-date-picker type="date" placeholder="Pick a day" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="person.data.birthday" clearable></el-date-picker>
    </el-form-item>
    </el-form>


    </el-tab-pane>

    <el-tab-pane label="Address">
        
    <el-form :model="person.address" :inline="true" class="demo-form-inline" :rules="rules.personAddress" ref="formPersonAddress">

    <el-form-item label="Street Name" prop="street">
        <el-input placeholder="Elm Street" v-model="person.address.street"></el-input>
    </el-form-item>
     <el-form-item label="Postal Code" prop="postalCode">
        <el-input placeholder="72201" v-model="person.address.postalCode"></el-input>
    </el-form-item>
     <el-form-item label="City" prop="city">
        <el-input placeholder="Dallas" v-model="person.address.city"></el-input>
    </el-form-item>
     <el-form-item label="State" prop="state">
        <el-input placeholder="Texas" v-model="person.address.state"></el-input>
    </el-form-item>
    <el-button type="primary" @click="AddAddressToTable">Add</el-button>
    </el-form>

    <el-table :model="tableAddresses" :rules="rules.tableAddresses" ref="formTableAddresses" :data="tableAddresses" max-height="250" size="mini">
      <el-table-column prop="street" label="Street Name" sortable>
      </el-table-column>
      <el-table-column prop="postalCode" label="Postal Code" sortable>
      </el-table-column>
      <el-table-column prop="city" label="City" sortable>
      </el-table-column>
      <el-table-column prop="state" label="State" sortable>
      </el-table-column>
    </el-table>

    </el-tab-pane>

    <el-tab-pane label="Contact">

  <el-row type="flex" justify="center"> 
    <el-col :span="10">
    <el-form :model="person.phoneNumber" :rules="rules.personPhoneNumber" ref="formPersonPhoneNumber" :inline="true" class="demo-form-inline">

    <el-form-item label="Phone Number" prop="number">
        <el-input placeholder="(99) 981824919" v-model="person.phoneNumber.number"></el-input>
    </el-form-item>
       <el-button type="primary" @click="AddPhoneNumberToTable">Add</el-button>
    </el-form>
    </el-col>

    <el-col :span="12">
    <el-form :model="person.email" :rules="rules.personEmail" ref="formPersonEmail" :inline="true" class="demo-form-inline">      
     <el-form-item label="E-mail" prop="description">
        <el-input placeholder="example@gmail.com" v-model="person.email.description"></el-input>
    </el-form-item>
     <el-button type="primary" @click="AddEmailToTable">Add</el-button>
     </el-form>
     </el-col>
  </el-row>

<el-row type="flex" justify="center">
  <el-col :span="22">
     <el-table :data="tablePhoneNumbers" style="width:55%;margin:auto" max-height="250" size="mini">
      <el-table-column prop="number" label="Phone Number" sortable>
      </el-table-column>
        <el-table-column label="Actions">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeletePhoneNumberTable(scope.row.number)"></el-button>
            </template>            
      </el-table-column>
    </el-table>
   </el-col>
   <el-col>
     <el-table :data="tableEmails" style="width:55%;margin:auto" max-height="250" size="mini">
      <el-table-column prop="description" label="E-mail" sortable>
      </el-table-column>
        <el-table-column label="Actions">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeleteEmailTable(scope.row.description)"></el-button>
            </template>            
      </el-table-column>
    </el-table>
    </el-col> 
</el-row>
    </el-tab-pane>
     
  </el-tabs>
  </el-col>
</el-row>

<br>
<br>
<el-row>
    <el-col :span="6">
       <el-button type="primary" @click="SavePerson()"> Save person </el-button>
    </el-col>
</el-row>

    <el-table :data="tablePersons" style="width: 60%;margin:auto">
         <el-table-column type="expand">
      <template slot-scope="scope">
      
    <el-tabs tab-position="left" style="height: 200px;">
     <el-tab-pane label="General">
        <p>Code: {{ scope.row.id }}</p>
        <p>First Name: {{ scope.row.firstName }}</p>
        <p>Last Name: {{ scope.row.lastName }}</p>
        <p>Birthday: {{ scope.row.birthday }}</p>
     </el-tab-pane>

     <el-tab-pane label="Addresses">
      
      <el-table :data="scope.row.addresses" style="width: 100%;margin:auto">
      <el-table-column prop="street" label="Street Name">
      </el-table-column>
      <el-table-column prop="postalCode" label="Postal Code">
      </el-table-column>
      <el-table-column prop="city" label="City">
      </el-table-column>
      <el-table-column prop="state" label="State">
      </el-table-column>
      </el-table>

    </el-tab-pane>
    <el-tab-pane label="Contact">
      <el-row type="flex">
        <el-col>
        <el-table :data="scope.row.phoneNumbers" style="width: 100%;margin:auto">
            <el-table-column prop="number" label="Phone number">
            </el-table-column>
            </el-table>
        </el-col>

           <el-col>
      <el-table :data="scope.row.emails" style="width: 100%;margin:auto">
        <el-table-column prop="description" label="E-mail address">
        </el-table-column>
        </el-table>
        </el-col>
      </el-row>   
     
    </el-tab-pane>
  </el-tabs>
      </template>
    </el-table-column>
      <el-table-column prop="firstName" label="First Name">
      </el-table-column>
      <el-table-column prop="lastName" label="Last Name">
      </el-table-column>
      <el-table-column prop="birthday" label="Birthday">
      </el-table-column>
          <el-table-column label="Actions">
      <template slot-scope="scope">
        <router-link :to="{name:'EditPerson',params:{'person':scope.row}}">
           <el-button size="mini" type="primary" icon="el-icon-edit" @click="DeletePhoneNumberTable(scope.row.number)"></el-button>
        </router-link>
        
       <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeletePhoneNumberTable(scope.row.number)"></el-button>
      </template>
    </el-table-column>
    </el-table>

</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    var CheckEmail = (rule, value, callback) => {
      if (value !== "") {
        for (var x = 0; x < this.tableEmails.length; x++) {
          if (value == this.tableEmails[x].email) {
            return callback(new Error("E-mail address already inserted."));
          }
        }
        callback();
      }
    };
    var CheckPhoneNumber = (rule, value, callback) => {
      if (value !== "") {
        for (var x = 0; x < this.tablePhoneNumbers.length; x++) {
          if (value == this.tablePhoneNumbers[x].phoneNumber) {
            return callback(new Error("Phone number already inserted."));
          }
        }
        callback();
      }
    };
    return {
      tablePersons: [], //PEOPLE TO SHOW IN THE TABLE
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
      rules: {
        // RULES FOR DATA DALIDATION IN FORMS
        tableAddresses:[
          {
            type: Array,
            required: true
          }
        ],
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
    };
  },
  methods: {
    ...mapActions(["InsertNewPerson", "SetPersons"]),
    ...mapGetters(["GetPersons"]),
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
        .catch(() => {});
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
        .catch(() => {});
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
        .catch(() => {});
    },
    DeletePhoneNumberTable(item) {
      var table = this.tablePhoneNumbers;

      for (let a = 0; a < table.length; a++) {
        if (table[a].phoneNumber == item) {
          table.splice(a, 1);
        }
      }
    },
    DeleteEmailTable(item) {
      var table = this.tableEmails;

      for (let a = 0; a < table.length; a++) {
        if (table[a].email == item) {
          table.splice(a, 1);
        }
      }
    },
    SavePerson() {
      this.$refs.formPersonData
        .validate()
        .then(valid => {
          if (valid) {
            this.InsertNewPerson({
              firstName: this.person.data.firstName,
              lastName: this.person.data.lastName,
              birthday: this.person.data.birthday,
              addresses: this.tableAddresses,
              phoneNumbers: this.tablePhoneNumbers,
              emails: this.tableEmails
            })
              .then(() => {
                this.PersonInsertedSuccesfullyMessage();
              })
              .catch(error => {
                alert(error);
              });
          }
        })
        .catch(() => {
          this.ErrorValidationMessage();
        });
    },
    LoadPersons() {
      this.SetPersons()
        .then(() => {
          this.tablePersons = this.GetPersons();
        })
        .catch(() => {
          alert("Persons could not be loaded.");
        });
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
    },
    PersonInsertedSuccesfullyMessage() {
      this.$message({
        showClose: true,
        message: "Person inserted successfully !",
        type: "success"
      });
    }
  },
  created() {
    this.LoadPersons();
  }
};
</script>

