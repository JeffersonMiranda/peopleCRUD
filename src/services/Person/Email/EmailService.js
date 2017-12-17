import http from '../../http'

export default class EmailService {

    GetEmail() {
        return http.get('/emails/');
    }

    InsertNewEmail(data) {
        return http.post('/emails/', data);
    }

    UpdateEmail(id, data) {
        return http.put('/emails', id, data);
    }

    DeleteEmail(id) {
        return http.delete('/emails/' + id);
    }

}