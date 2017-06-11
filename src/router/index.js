import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import EditProject from '@/components/EditProject'
import ViewProject from '@/components/ViewProject'
import ProjectList from '@/components/ProjectList'

Vue.use(Router)


// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {

  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}



export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects/',
      name: 'project-list',
      component: ProjectList,
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
      component: ViewProject,
    }
  ]

})
