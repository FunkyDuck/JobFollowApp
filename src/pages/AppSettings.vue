<template>
  <q-page class="flex flex-center column">
    <h1>
      <q-icon name="settings" />
      Settings
    </h1>

    <q-btn 
      @click="isDarkMode = !isDarkMode"
      :label="isDarkMode ? 'Light theme' : 'Dark theme'"
      :icon="isDarkMode ? 'light_mode' : 'dark_mode'" 
      color="grey-8" />
    
    <q-btn 
      @click="null"
      label="Language"
      icon="flag" 
      color="grey-8" />

    <q-btn 
      @click="null"
      label="Notifications"
      icon="notifications" 
      color="grey-8" />
    
    <q-btn 
      @click="null"
      label="Export datas"
      icon="download_for_offline" 
      color="grey-8" />

    <q-btn 
      @click="null"
      label="Import datas"
      icon="upload_file" 
      color="grey-8" />

    <q-btn 
      :label="`Version: ${appVersion}`"
      dense
      icon="smartphone" 
      color="grey-8" />

    <q-btn 
      @click="null"
      label="About"
      icon="remember_me" 
      color="grey-8" />
      
    <q-btn 
      @click="alertDeleteDatas = true"
      label="Delete all Datas"
      icon="delete" 
      color="red-10"/>

    <q-dialog v-model="alertDeleteDatas" :class="{ shake: isShaking }" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">
            ⚠️ This will permanently delete all saved datas.<br>
            Are you absolutely sure?<br>
            This action cannot be undone.
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No, Cancel" icon="close" color="primary" v-close-popup @click="alertDeleteDatas = false" />
          <q-btn flat label="Yes, Delete all" icon="check" color="primary" v-close-popup @click="deleteAllDatas()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
  
<script setup>
  import { resetDb } from 'src/services/db'
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'

  const alertDeleteDatas = ref(false)
  const $q = useQuasar()
  const isShaking = ref(false)
  const isDarkMode = ref(false)
  const appVersion = import.meta.env.APP_VERSION || 'dev'

  console.log(appVersion)

  const deleteAllDatas = async () => {
    try {
      await resetDb()

      isShaking.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      isShaking.value = false
      alertDeleteDatas.value = false

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
      alertDeleteDatas.value = false
    }
  }
</script>

<style>
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  .shake {
    animation: shake 0.5s ease;
  }

  button {
    margin: 1dvh 0;
  }
</style>