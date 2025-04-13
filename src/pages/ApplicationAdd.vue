<template>
    <q-page class="flex flex-center column">
        <h1>
            <q-icon name="post_add" />
            New Application
        </h1>

        <q-form
            @submit="onSubmit"
            @reset="onreset"
            class="" >
            <q-input 
                filled
                v-model="title"
                label="Job Title"
                placeholder="ex: Super Dev" />
            <q-input
                filled
                v-model="company"
                label="Company"
                placeholder="ex: SuperCode ltd" />
            <q-input
                filled
                v-model="offer_url"
                label="Link of the offer"
                placeholder="ex: https://linkedin.com/superoffer" />
            <q-input
                filled
                type="date"
                v-model="date_applied"
                label="Application Date"
                placeholder="ex: 12/03/2025" />
            <q-select
                v-model="status"
                label="Status"
                :options="status_options" />
            <q-input 
                filled
                type="textarea"
                v-model="note"
                label="Note"
                placeholder="Additionnal note about this application"/>
            <q-btn label="Submit" type="submit" color="primary" /> 
        </q-form>
    </q-page>
  </template>
  
  <script setup>
    import { useQuasar } from 'quasar'
    import { ref } from 'vue'

    const $q = useQuasar();

    const title = ref(null)
    const company = ref(null)
    const offer_url = ref(null)
    const date_applied = ref(null)
    const status = ref(null)
    const note = ref(null)

    const onSubmit = (()=>{
        if(title.value === null || title.value === '') {
            $q.notify({
                color: 'red-10',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to add a job title...'
            })
        } 
        else if(company.value === null || company.value === '') {
            $q.notify({
                color: 'red-10',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to add the company application...'
            })
        }
        else {
            $q.notify({
                color: 'green-8',
                textColor: 'white',
                icon: 'task',
                message: 'Application registered'
            })
        }
    })
  </script>
  