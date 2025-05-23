import DashBoard from 'pages/DashBoard.vue'
import ApplicationsList from 'pages/ApplicationsList.vue'
import ApplicationAdd from 'pages/ApplicationAdd.vue'
import ApplicationsStats from 'pages/ApplicationsStats.vue'
import AppSettings from 'pages/AppSettings.vue'
import JobFairs from 'src/pages/JobFairs.vue'
import GuidanceCoaching from 'src/pages/GuidanceCoaching.vue'
import PersonalContact from 'src/pages/PersonalContact.vue'

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
      { path: 'job-fairs', component: JobFairs },
      { path: 'guidance-coaching', component: GuidanceCoaching },
      { path: 'personal-contact', component: PersonalContact },
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
