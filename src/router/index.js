import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import EditPerson from '../components/EditPerson.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home // FOR ADDING NEW PERSON
    },
    {
      path: '/edit-person',
      name: 'EditPerson',
      component: EditPerson // FOR EDITING EXISTING PERSON
    }
  ]
})
