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
      name: 'project-list',
      component: ProjectList
    },
    {
      path: '/projects/new',
      name: 'new-project',
      component: EditProject
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
