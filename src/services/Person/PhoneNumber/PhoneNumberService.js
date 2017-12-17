import http from '../../http'

export default class PhoneNumberService {

    GetPhoneNumbers() {
        return http.get('/phoneNumbers/');
    }

    InsertNewPhoneNumber(data) {
        return http.post('/phoneNumbers/', data);
    }

    UpdatePhoneNumber(id, data) {
        return http.put('/phoneNumbers', id, data);
    }

    DeletePhoneNumber(id) {
        return http.delete('/phoneNumbers/' + id);
    }

}