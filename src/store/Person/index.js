import PersonService from '../../services/Person/PersonService'

export default {
    state: {
        persons: []
    },
    mutations: {
        SET_PERSONS(state, personsData) { // GET THE PERSONS FROM DATABASE AND FEED THE STATE
            state.persons = personsData
        }
    },
    actions: {
        SetPersons({ commit }) {
            return new Promise((resolve, reject) => {
                var PersonEntity = new PersonService();
                PersonEntity.GetPersons().then(response => {
                    commit('SET_PERSONS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        InsertNewPerson({ commit }, data) {
            return new Promise((resolve, reject) => {
                var PersonEntity = new PersonService();
                PersonEntity.InsertNewPerson(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        UpdatePerson({ commit }, data) {
            return new Promise((resolve, reject) => {
                var PersonEntity = new PersonService();
                PersonEntity.UpdatePerson(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        DeletePerson({ commit }, id) {
            return new Promise((resolve, reject) => {
                var PersonEntity = new PersonService();
                PersonEntity.DeletePerson(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        GetPersons: state => {
            return state.persons
        }
    }
}