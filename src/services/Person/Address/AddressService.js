import http from '../../http'

export default class AddressService {

    GetAddresses() {
        return http.get('/addresses/');
    }

    InsertNewAddress(data) {
        return http.post('/addresses/', data);
    }

    UpdateAddress(id, data) {
        return http.put('addresses', id, data);
    }

    DeleteAddress(id) {
        return http.delete('/addresses/' + id);
    }

}