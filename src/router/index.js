import Vue from 'vue'
import Router from 'vue-router'
import NewProject from '@/components/NewProject'
import EditProject from '@/components/EditProject'
import ViewProject from '@/components/ViewProject'
import ProjectList from '@/components/ProjectList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/projects/new'
    },
    {
      path: '/projects/',
      name: 'project-list',
      component: ProjectList
    },
    {
      path: '/projects/new',
      name: 'new-project',
      component: NewProject
    },
    {
      path: '/projects/:id/edit',
      name: 'edit-project',
      component: EditProject
    },
    {
      path: '/projects/:id/',
      name: 'view-project',
      component: ViewProject
    }
  ]
})
