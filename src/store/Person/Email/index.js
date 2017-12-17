import EmailService from '../../../services/Person/Email/EmailService'

export default {
    state: {
        emails: []
    },
    mutations: {
        SET_EMAILS(state, emailsData) {  // GET THE EMAILS FROM DATA BASE AND FEED THE STATE
            state.emails = emailsData
        }
    },
    actions: {
        SetEmails({ commit }) {
            return new Promise((resolve, reject) => {
                var EmailEntity = new EmailService();
                EmailEntity.GetAddresses().then(response => {
                    commit('SET_EMAILS', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        InsertEmail({ commit }, data) {
            return new Promise((resolve, reject) => {
                var EmailEntity = new EmailService();
                EmailEntity.InsertNewAddress(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        UpdateEmail({ commit }, id, data) {
            return new Promise((resolve, reject) => {
                var EmailEntity = new EmailService();
                EmailEntity.InsertNewAddress(id, data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        DeleteEmail({ commit }, data) {
            return new Promise((resolve, reject) => {
                var EmailEntity = new EmailService();
                EmailEntity.DeleteAddress(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        GetEmails: state => {
            return state.emails
        }
    }
}