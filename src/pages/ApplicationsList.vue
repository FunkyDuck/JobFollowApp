<template>
  <q-page class="flex flex-center column" v-if="!selectedApplication">
    <h1>
      <q-icon name="list_alt" />
      Applications list
    </h1>

    <section>
      <ul>
        <li v-for="item in applications"
          :key="item._id"
          v-bind="item"
          @click="selectedApplication = item">
          <h2>
            <q-icon name="work" />
            {{ item.title }}
          </h2>

          <section>
            <b>
              <q-icon name="flag" />
              {{ item.city }} • {{ item.country }}
            </b>
            
            <i>
              <q-icon name="event" />
              {{ item.date_applied }}
            </i>
          </section>
        </li>
      </ul>
    </section>
  </q-page>

  <q-page class="flex flex-center column" v-else>
    <h1>
      <q-icon name="work" />
      Application for
    </h1>

    <h2>
      {{ selectedApplication.title }} <i>@ {{ selectedApplication.company }}</i>
    </h2>

    <!-- <section class="column"> -->
      <b>
        <q-icon name="flag" />
        {{ selectedApplication.city }} • <i>{{ selectedApplication.country }}</i>
      </b>

      <i>
        <q-icon name="event" />
        {{ selectedApplication.date_applied }}
      </i>

      <div v-if="selectedApplication.offer_url">
        <q-icon name="link" />
        <a href="selectedApplication.offer_url" target="_blank">{{ selectedApplication.offer_url }}</a>
      </div>

      <q-btn @click="selectedApplication = null" label="Back" icon="keyboard_return" /> 
    <!-- </section> -->
  </q-page>
</template>
  
<script setup>
  //
  import { ref, onMounted } from 'vue'
  import { findCandidatures } from 'src/services/db'

  const applications = ref([])
  const selectedApplication = ref(null)
    
  onMounted(async () => {
    applications.value = await findCandidatures()
    console.log(applications.value)
  })
</script>
  
<style>
  h1 {
    i {
      font-size: 3rem;
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
      width: 40%;
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