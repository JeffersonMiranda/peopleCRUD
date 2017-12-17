import Vue from 'vue';
import Vuex from 'vuex';
import person from '../store/Person'
import address from '../store/Person/Address'
import email from '../store/Person/Email'
import phoneNumber from '../store/Person/PhoneNumber'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        person,
        address,
        email,
        phoneNumber
    }
})