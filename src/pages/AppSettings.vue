<template>
  <q-page class="flex flex-center column">
    <h1>
      <q-icon name="settings" />
      Settings
    </h1>
      
    <q-btn 
      @click="alertDeleteApplications = true"
      label="Delete all Applications"
      icon="delete" 
      color="red-10"/>

    <q-dialog v-model="alertDeleteApplications" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">
            ⚠️ This will permanently delete all saved applications.<br>
            Are you absolutely sure?<br>
            This action cannot be undone.
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No, Cancel" icon="close" color="primary" v-close-popup @click="alertDeleteApplications = false" />
          <q-btn flat label="Yes, Delete all" icon="check" color="primary" v-close-popup @click="deleteAllApplications()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
  
<script setup>
  import { resetDb } from 'src/services/db'
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'

  const alertDeleteApplications = ref(false)
  const $q = useQuasar()

  const deleteAllApplications = async () => {
    try {
      await resetDb()

      $q.notify({
        color: 'green-8',
        textColor: 'white',
        icon: 'task_alt',
        message: 'Application registered'
      })
    } catch (error) {
      console.error(error)

      $q.notify({
        color: 'red-10',
        textColor: 'white',
        icon: 'error',
        message: 'Problem for delete applications'
      })
    }
    alertDeleteApplications.value = false
  }
</script>
  