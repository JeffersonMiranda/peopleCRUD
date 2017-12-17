import http from '../http'

export default class PersonService {

    GetPersons() {
        return http.get('/persons/');
    }

    InsertNewPerson(data) {
        return http.post('/persons/', data);
    }

    UpdatePerson(data) {
        return http.put('/persons/'+ data.id + '/', data);
    }

    DeletePerson(id) {
        return http.delete('/persons/' + id);
    }

}