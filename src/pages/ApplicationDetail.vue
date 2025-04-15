<template>
    <q-page class="flex flex-center column">
      <h1>
        <q-icon name="work" />
        Application detail
      </h1>
  
      <ul>
        <li>
            <h2>
                {{ application.title }} <i>@ {{ application.company }}</i>
            </h2>
        </li>

        <li>
            <b>
                <q-icon name="flag" />
                {{ application.city }} • <i>{{ application.country }}</i>
            </b>
        </li>

        <li>
            <i>
                <q-icon name="event" />
                {{ application.date_applied }}
            </i>
        </li>

        <li>
            <q-icon name="support_agent" />
            {{ application.status }}
        </li>

        <li v-if="application.offer_url">
            <q-icon name="link" />
            <a :href="application.offer_url" target="_blank">{{ application.offer_url }}</a>
        </li>

        <li v-if="application.notes">
            <q-icon name="sticky_note_2" />
            {{ application.notes }}
        </li>
      </ul>

      <q-btn label="Update application" icon="update" />
      <q-btn label="Add contact" icon="group_add" />
      <q-btn @click="$emit('close')" label="Back" icon="keyboard_return" /> 
    </q-page>
  </template>
    
  <script setup>
    //
    import { ref, onMounted } from 'vue'
    // import { findCandidatures } from 'src/services/db'
  
    // const applications = ref([])
    // const application = ref(null)
      
    defineProps({
        application: Object
    })
    
    // onMounted(async () => {
    //   applications.value = await findCandidatures()
    //   console.log(applications.value)
    // })
  </script>
    
  <style>
    h1 {
        /* width: 100%; */

        i {
            font-size: 3rem;
            font-weight: lighterS;
            vertical-align: sub;
        }
    }
  
    li {
      list-style-type: none;
      text-align: left;
      background: #C5C3C6;
      color: #1985A1;
      padding: 0.125dvh 1dvw;
      width: 98dvw;
      display: flex;
      flex-direction: row;
  
      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 2rem;
        vertical-align: middle;
        margin: 0;
        padding: 0;
      }
  
      section {
        width: 60%;
        display: flex;
        flex-direction: column;
      }
    }
  
    li:nth-child(odd) {
      background: #DCDCDD;
    }
  
    li:first-child {
      border-radius: 8px 8px 0 0;
    }
  
    li:last-child {
      border-radius: 0 0 8px 8px;
    }
  
    @media screen and (min-width: 1024px) {
      li {
        width: 40dvw;
      }
    }
  </style>