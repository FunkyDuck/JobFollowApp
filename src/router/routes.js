import DashBoard from 'pages/DashBoard.vue'
import ApplicationsList from 'pages/ApplicationsList.vue'
import ApplicationAdd from 'pages/ApplicationAdd.vue'
import ApplicationsStats from 'pages/ApplicationsStats.vue'
import AppSettings from 'pages/AppSettings.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: DashBoard },
      { path: 'dashboard', component: DashBoard },
      { path: 'applications-list', component: ApplicationsList },
      { path: 'application-new', component: ApplicationAdd },
      { path: 'applications-stats', component: ApplicationsStats },
      { path: 'app-settings', component: AppSettings },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
