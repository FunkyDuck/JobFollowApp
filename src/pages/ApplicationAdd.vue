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
                outlined
                v-model="title"
                label="Job Title"
                placeholder="ex: Super Dev"
                style="width:40dvw; margin:0.5dvh 0;" >
                <template v-slot:prepend>
                    <q-icon name="work" />
                </template>
            </q-input>

            <q-input
                outlined
                v-model="company"
                label="Company"
                placeholder="ex: SuperCode ltd"
                style="width:40dvw; margin:0.5dvh 0;" >
                <template v-slot:prepend>
                    <q-icon name="badge" />
                </template>
            </q-input>

            <q-input
                outlined
                v-model="offer_url"
                label="Link of the offer"
                placeholder="ex: https://linkedin.com/superoffer"
                style="width:40dvw; margin:0.5dvh 0;" >
                <template v-slot:prepend>
                    <q-icon name="add_link" />
                </template>
            </q-input>

            <q-input 
                outlined
                v-model="city"
                label="City of the offer"
                placeholder="ex: Bruxelles"
                style="width:40dvw; margin:0.5dvh 0;" >
                <template v-slot:prepend>
                    <q-icon name="location_city" />
                </template>
            </q-input>

            <q-input 
                outlined
                v-model="country"
                label="Country of the offer"
                placeholder="ex: Belgium"
                style="width:40dvw; margin:0.5dvh 0;">
                <template v-slot:prepend>
                    <q-icon name="flag" />
                </template>
            </q-input>

            <q-select
                outlined
                v-model="on_site"
                label="Work mode"
                :options="on_site_options"
                style="width:40dvw; margin:0.5dvh 0;">
                <template v-slot:prepend>
                    <q-icon name="group_work" />
                </template>
            </q-select>

            <q-select
                outlined
                v-model="status"
                label="Status"
                :options="status_options" 
                style="width:40dvw; margin:0.5dvh 0;">
                <template v-slot:prepend>
                    <q-icon name="support_agent" />
                </template>
            </q-select>

            <q-input
                outlined
                type="date"
                v-model="date_applied"
                label="Application Date"
                placeholder="ex: 12/03/2025"
                style="width:40dvw; margin:0.5dvh 0;">
                <template v-slot:prepend>
                    <q-icon name="today" />
                </template>
            </q-input>
            
            <q-input 
                outlined
                type="textarea"
                v-model="notes"
                label="Notes"
                placeholder="Additionnal notes about this application"
                style="width:40dvw; margin:0.5dvh 0;">
                <template v-slot:prepend>
                    <q-icon name="sticky_note_2" />
                </template>
            </q-input>
            <q-btn label="Submit" type="submit" color="primary" icon="note_add" style="width:40dvw; margin:0.5dvh 0;" />
        </q-form>
    </q-page>
  </template>
  
  <script setup>
    import { useQuasar } from 'quasar'
    import { addApplication } from '../services/db';
    import { ref } from 'vue'

    const $q = useQuasar();

    const title = ref(null)
    const company = ref(null)
    const city = ref(null)
    const country = ref(null)
    const on_site = ref(null)
    const offer_url = ref(null)
    const date_applied = ref(null)
    const status = ref(null)
    const notes = ref(null)

    const on_site_options = ['On Site', 'Remote', 'Hybrid']
    const status_options = ['Draft', 'Applied', 'Interview', 'Offer', 'Accepted', 'Rejected', 'WithDraw', 'Archived']

    const onSubmit = async ()=>{
        if(title.value === null || title.value === '') {
            $q.notify({
                color: 'orange-5',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to add a job title...'
            })
        } 
        else if(company.value === null || company.value === '') {
            $q.notify({
                color: 'orange-5',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to add the company application...'
            })
        }
        else {
            try {
                if(date_applied.value === null) {
                    const today = new Date().toISOString()
                    date_applied.value = today.split('T')[0]
                }

                const response = await addApplication((application) => {
                    application.title = title.value,
                    application.company = company.value,
                    application.city = city.value,
                    application.country = country.value,
                    application.offer_url = offer_url.value,
                    application.status = status.value,
                    application.date_applied = date_applied.value,
                    application.on_site = on_site.value,
                    application.notes = notes.value

                    return application
                })

                setTimeout(() => {
                    title.value = null
                    company.value = null
                    city.value = null
                    country.value = null
                    offer_url.value = null
                    status.value = null
                    date_applied.value = null
                    on_site.value = null
                    notes.value = null
                },10)

                console.log(response);

                $q.notify({
                    color: 'green-8',
                    textColor: 'white',
                    icon: 'task',
                    message: 'Application registered'
                })
            } catch (error) {
                console.error(error)
                $q.notify({
                    color: 'red-10',
                    textColor: 'white',
                    icon: 'error',
                    message: 'Problem when register application...'
                })
            }
        }
    }
  </script>

  