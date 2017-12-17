import PhoneNumberService from '../../../services/Person/PhoneNumber/PhoneNumberService'

export default {
    state: {
        phoneNumbers: []
    },
    mutations: {
        SET_PHONE_NUMBERS(state, phoneNumbersData) { // GET THE PHONE NUMBERS FROM DATABASE AND FEED THE STATE
            state.phoneNumbers = phoneNumbersData
        }
    },
    actions: {
        SetPhoneNumbers({ commit }) {
            return new Promise((resolve, reject) => {
                var PhoneNumberEntity = new PhoneNumberService();
                PhoneNumberEntity.GetPhoneNumbers().then(response => {
                    commit('SET_PHONE_NUMBERS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        InsertNewPhoneNumber({ commit }, data) {
            return new Promise((resolve, reject) => {
                var PhoneNumberEntity = new PhoneNumberService();
                PhoneNumberEntity.InsertNewPhoneNumber(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        UpdatePhoneNumber({ commit }, id, data) {
            return new Promise((resolve, reject) => {
                var PhoneNumberEntity = new PhoneNumberService();
                PhoneNumberEntity.UpdatePhoneNumber(id, data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        DeletePhoneNumber({ commit }, id) {
            return new Promise((resolve, reject) => {
                var PhoneNumberEntity = new PhoneNumberService();
                PhoneNumberEntity.DeletePhoneNumber(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        GetPhoneNumbers: state => {
           return state.phoneNumbers
        }
    }
}