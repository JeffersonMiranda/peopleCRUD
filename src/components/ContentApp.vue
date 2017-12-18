<template>
<div>

<div id="TabsContent" v-if="savingPerson==false">

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
        <el-input placeholder="222-055-9034" v-model="person.phoneNumber.number"></el-input>
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
     <el-table :data="tablePhoneNumbers" style="width:55%;margin:auto;text-align:left" max-height="250" size="mini">
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
     <el-table :data="tableEmails" style="width:55%;margin:auto;text-align:left" max-height="250" size="mini">
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
</div>

  <i v-else class="el-icon-loading" style="margin-top:20px;margin-bottom:20px"></i> 

<!-- TABLE TO SHOW REGISTERED PERSONS FROM DATABASE-->


    <el-table :data="tablePersons" height="400" style="width:60%;margin:auto;text-align:left" v-if="tablePersons.length > 0 ">
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
      
      <el-table :data="scope.row.addresses" size="mini" style="width: 100%;margin:auto;text-align:left">
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
        <el-table :data="scope.row.phoneNumbers" size="mini" style="width: 100%;margin:auto;text-align:left">
            <el-table-column prop="number" label="Phone number">
            </el-table-column>
            </el-table>
        </el-col>

           <el-col>
      <el-table :data="scope.row.emails" size="mini" style="width: 100%;margin:auto;text-align:left">
        <el-table-column prop="description" label="E-mail address">
        </el-table-column>
        </el-table>
        </el-col>
      </el-row>   
     
    </el-tab-pane>
  </el-tabs>
      </template>
    </el-table-column>
 
      <el-table-column prop="firstName" label="First Name" sortable>
      </el-table-column>
      <el-table-column prop="lastName" label="Last Name" sortable>
      </el-table-column>
      <el-table-column prop="birthday" label="Birthday" sortable>
      </el-table-column>
          <el-table-column label="Actions">
      <template slot-scope="scope">
        <router-link :to="{name:'EditPerson',params:{'person':scope.row}}">       
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
        </router-link>        
       <el-button size="mini" type="danger" icon="el-icon-delete" @click="ExcludePerson(scope.row.id)"></el-button>
      </template>
    </el-table-column>
    </el-table>
    <i v-else class="el-icon-loading" style="margin-top:100px"></i>

</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PersonData from "./PersonMixin";

export default {
  mixins: [PersonData],
  data() {
    return {
      tablePersons: [] //PEOPLE TO SHOW IN THE TABLE
    };
  },
  methods: {
    ...mapActions(["InsertNewPerson", "SetPersons", "DeletePerson"]),
    ...mapGetters(["GetPersons"]),
    PersonToDataBase() {
      this.savingPerson = true;
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
                this.savingPerson = false;
                this.PersonInsertedSuccesfullyMessage();
                this.LoadPersons();
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
    SavePerson() {
      if (this.tablePhoneNumbers.length >= 1) {
        if (this.tableEmails.length >= 1) {
          this.PersonToDataBase();
        } else {
          this.ErrorAtLeastOneEmailMessage();
        }
      } else {
        this.ErrorAtLeastOnePhoneNumberMessage();
      }
    },
    ExcludePerson(personDeleted) {
      this.$confirm(
        "This will permanently delete the person. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          this.DeletePerson(personDeleted)
            .then(() => {
              this.$message({
                type: "success",
                message: "Delete completed"
              });
              for (let a = 0; a < this.tablePersons.length; a++) {
                if (this.tablePersons[a].id == personDeleted) {
                  this.tablePersons.splice(a, 1);
                }
              }
            })
            .catch(() => {
              this.ErrorDeletePersonMessage();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    LoadPersons() {
      setTimeout(() => {
        this.SetPersons()
          .then(() => {
            this.tablePersons = this.GetPersons();
          })
          .catch(() => {
            alert("Persons could not be loaded.");
          });
      }, 3000);
    },
    ErrorDeletePersonMessage() {
      this.$message({
        showClose: true,
        message: "Error deleting person.",
        type: "error"
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

