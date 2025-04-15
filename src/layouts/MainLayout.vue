<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img
        alt="JobFollow logo"
        src="~assets/logo.svg"
        style="width: auto; height: 4dvh;margin: 0.5dvh 0;"
        >
        <q-toolbar-title>
          JobFollow
        </q-toolbar-title>
        
        <!-- <div>Quasar v{{ $q.version }}</div> -->

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>
        <q-item-label
          header>
          Main Menu
        </q-item-label>

        <MainLink v-for="link in navlinks"
          :key="link.title"
          v-bind="link" />
      </q-list>

      <!-- <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
import MainLink from 'components/MainLink.vue'

const navlinks = [
  {
    title: 'DashBoard',
    caption: 'DashBoard',
    icon: 'dashboard',
    link: '/dashboard/'
  },
  {
    title: 'Applications',
    caption: 'Applications list',
    icon: 'list_alt',
    link: '/applications-list/'
  },
  {
    title: 'Add Application',
    caption: 'Adding a new application',
    icon: 'post_add',
    link: '/application-new/'
  },
  {
    title: 'Job Fairs',
    caption: 'View yours job fairs. Also for adding or updating a job fair.',
    icon: 'festival',
    link: '/job-fairs/'
  },
  {
    title: 'Stats',
    caption: 'Applications statistics',
    icon: 'query_stats',
    link: '/applications-stats/'
  },
  {
    title: 'Settings',
    caption: 'App settings',
    icon: 'settings',
    link: '/app-settings/'
  },

]

// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
  h1 {
    /* font-size: 5rem; */
    margin: 2dvh 0;
  }
</style>
