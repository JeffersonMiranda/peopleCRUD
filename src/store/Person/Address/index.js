import AddressService from '../../../services/Person/Address/AddressService'

export default {
    state: {
        addresses: []
    },
    mutations: {
        SET_ADDRESSES(state, addressesData) {  // GET THE ADDRESSES FROM DATA BASE AND FEED THE STATE
            state.addresses = addressesData
        }

    },
    actions: {
        SetAddresses({ commit }) {
            return new Promise((resolve, reject) => {
                var AddressEntity = new AddressService();
                AddressEntity.GetAddresses().then(response => {
                    commit('SET_ADDRESSES', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        InsertAddress({ commit }, data) {
            return new Promise((resolve, reject) => {
                var AddressEntity = new AddressService();
                AddressEntity.InsertNewAddress(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        UpdateAddress({ commit }, id, data) {
            return new Promise((resolve, reject) => {
                var AddressEntity = new AddressService();
                AddressEntity.InsertNewAddress(id, data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        DeleteAddress({ commit }, data) {
            return new Promise((resolve, reject) => {
                var AddressEntity = new AddressService();
                AddressEntity.DeleteAddress(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        GetAddresses: state => {
            return state.addresses
        }
    }
}