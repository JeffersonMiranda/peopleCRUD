
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
    <el-button v-if="EditingAddressForm==false" type="primary" @click="AddAddressToTable">Add</el-button>
    <el-button v-else type="primary" @click="FinishAddressEditing">Finish</el-button>
    </el-form>

    <el-table :data="tableAddresses" style="text-align:left" max-height="250" size="mini">
      <el-table-column prop="street" label="Street Name" sortable>
      </el-table-column>
      <el-table-column prop="postalCode" label="Postal Code" sortable>
      </el-table-column>
      <el-table-column prop="city" label="City" sortable>
      </el-table-column>
      <el-table-column prop="state" label="State" sortable>
      </el-table-column>
        <el-table-column label="Actions">
            <template slot-scope="scope">
               <el-button size="mini" type="primary" icon="el-icon-edit" @click="SendAddressFromTableToForm(scope.row)"></el-button>
               <el-button size="mini" type="danger" icon="el-icon-delete" @click.prevent="DeleteAddressTable(scope.row)"></el-button>
            </template>
      </el-table-column>
    </el-table>

    </el-tab-pane>

    <el-tab-pane label="Contact">

  <el-row type="flex" justify="center"> 
    <el-col :span="10">
    <el-form :model="person.phoneNumber" :rules="rules.personPhoneNumber" ref="formPersonPhoneNumber" :inline="true" class="demo-form-inline">

    <el-form-item label="Phone Number" prop="number">
        <el-input placeholder="222-055-9034" v-model="person.phoneNumber.number"></el-input>
    </el-form-item>
       <el-button v-if="EditingPhoneForm==false" type="primary" @click="AddPhoneNumberToTable">Add</el-button>
       <el-button v-else type="primary" @click="FinishPhoneNumberEditing">Finish</el-button>
    </el-form>
    </el-col>

    <el-col :span="12">
    <el-form :model="person.email" :rules="rules.personEmail" ref="formPersonEmail" :inline="true" class="demo-form-inline">      
     <el-form-item label="E-mail" prop="description">
        <el-input type="email" placeholder="example@gmail.com" v-model="person.email.description"></el-input>
    </el-form-item>
        <el-button v-if="EditingEmailForm==false" type="primary" @click="AddEmailToTable">Add</el-button>
        <el-button v-else type="primary" @click="FinishEmailEditing">Finish</el-button>
     </el-form>
     </el-col>
  </el-row>

<el-row type="flex" justify="center">
  <el-col :span="22">
     <el-table :data="tablePhoneNumbers" style="width:55%;margin:auto;text-align:left" max-height="250" size="mini">
      <el-table-column prop="number" label="Phone Number" sortable>
      </el-table-column>
        <el-table-column label="Actions">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="SendPhoneNumberFromTableToForm(scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeletePhoneNumberTable(scope.row.number)"></el-button>
            </template>            
      </el-table-column>
    </el-table>
   </el-col>
   <el-col>
     <el-table :data="tableEmails" style="width:60%;margin:auto;text-align:left" max-height="250" size="mini">
      <el-table-column prop="description" label="E-mail" sortable>
      </el-table-column>
        <el-table-column label="Actions">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="SendEmailFromTableToForm(scope.row)"></el-button>
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
    <el-col :span="4">
      <router-link :to="{name: 'Home'}" style="font-size:12px">
        <a> Back to home </a>
      </router-link>
      
    </el-col>
    <el-col :span="2">       
       <el-button type="primary" @click="ModifyPerson()"> Save modifications </el-button>
    </el-col>
</el-row>

</div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import PersonData from "./PersonMixin";

export default {
  mixins: [PersonData],
  data() {
    return {
      person: {
        data: {
          id: ""
        }
      },
      tablePersons: [], //PEOPLE TO SHOW IN THE TABLE
      deletedAddresses: [],
      deletedPhoneNumbers: [],
      deletedEmails: [],
      EditingAddressForm: false,
      EditingPhoneForm: false,
      EditingEmailForm: false
    };
  },
  methods: {
    ...mapActions([
      "InsertNewPerson",
      "SetPersons",
      "DeletePerson",
      "UpdatePerson"
    ]),
    ...mapGetters(["GetPersons"]),
    SendAddressFromTableToForm(addressTable) {
      // FOR EDITING
      this.person.address = {
        id: addressTable.id,
        street: addressTable.street,
        postalCode: addressTable.postalCode,
        city: addressTable.city,
        state: addressTable.state
      };
      this.EditingAddressForm = true;
    },
    FinishAddressEditing() {
      for (let x = 0; x < this.tableAddresses.length; x++) {
        if (this.tableAddresses[x].id == this.person.address.id) {
          this.tableAddresses[x].street = this.person.address.street;
          this.tableAddresses[x].postalCode = this.person.address.postalCode;
          this.tableAddresses[x].city = this.person.address.city;
          this.tableAddresses[x].state = this.person.address.state;
          break;
        }
      }
      this.person.address = {
        id: "",
        street: "",
        postalCode: "",
        city: "",
        state: ""
      };
      this.$refs.formPersonData.clearValidate();
      this.EditingAddressForm = false;
    },
    SendPhoneNumberFromTableToForm(phoneNumberTable) {
      // FOR EDITING
      this.person.phoneNumber = {
        id: phoneNumberTable.id,
        number: phoneNumberTable.number
      };
      this.EditingPhoneForm = true;
    },
    FinishPhoneNumberEditing() {
      for (let x = 0; x < this.tablePhoneNumbers.length; x++) {
        if (this.tablePhoneNumbers[x].id == this.person.phoneNumber.id) {
          this.tablePhoneNumbers[x].number = this.person.phoneNumber.number;
          break;
        }
      }
      this.person.phoneNumber = {
        id: "",
        number: ""
      };
      this.$refs.formPersonPhoneNumber.clearValidate();
      this.EditingPhoneForm = false;
    },
    SendEmailFromTableToForm(emailTable) {
      // FOR EDITING
      this.person.email = {
        id: emailTable.id,
        description: emailTable.description
      };
      this.EditingEmailForm = true;
    },
    FinishEmailEditing() {
      for (let x = 0; x < this.tableEmails.length; x++) {
        if (this.tableEmails[x].id == this.person.email.id) {
          this.tableEmails[x].description = this.person.email.description;
          break;
        }
      }
      this.person.email = {
        id: "",
        description: ""
      };
      this.$refs.formPersonEmail.clearValidate();
      this.EditingEmailForm = false;
    },
    ModifyPerson() {
      if (this.tablePhoneNumbers.length >= 1) {
        if (this.tableEmails.length >= 1) {
          this.$refs.formPersonData
            .validate()
            .then(valid => {
              if (valid) {
                this.UpdatePerson({
                  id: this.person.data.id,
                  firstName: this.person.data.firstName,
                  lastName: this.person.data.lastName,
                  birthday: this.person.data.birthday,
                  addresses: this.tableAddresses,
                  phoneNumbers: this.tablePhoneNumbers,
                  emails: this.tableEmails
                })
                  .then(() => {
                    this.PersonUpdatedSuccesfullyMessage();
                  })
                  .catch(error => {
                    alert(error);
                  });
              }
            })
            .catch(() => {
              this.ErrorValidationMessage();
            });
        } else {
          this.ErrorAtLeastOneEmailMessage();
        }
      } else {
        this.ErrorAtLeastOnePhoneNumberMessage();
      }
    },
    PersonUpdatedSuccesfullyMessage() {
      this.$message({
        showClose: true,
        message: "Person updated successfully !",
        type: "success"
      });
    }
  },
  created() {
    this.person.data.id = this.$route.params.person.id;
    this.person.data.firstName = this.$route.params.person.firstName;
    this.person.data.lastName = this.$route.params.person.lastName;
    this.person.data.birthday = this.$route.params.person.birthday;
    this.tableAddresses = this.$route.params.person.addresses;
    this.tablePhoneNumbers = this.$route.params.person.phoneNumbers;
    this.tableEmails = this.$route.params.person.emails;
  }
};
</script>
