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

        <q-tabs
            v-model="tab"
            inline-label
            class="bg-primary text-white shadow-2">
            <q-tab name="contacts" icon="contacts" label="Contacts" />
            <q-tab name="history" icon="work_history" label="History" />
            <q-tab name="notes" icon="notes" label="Notes" />
            <q-tab name="notifications" icon="notifications" label="Notifications" />
        </q-tabs>
        <q-tab-panels
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel name="contacts">
                <h2>
                    <q-icon name="contacts" />
                    Contacts
                </h2>

                <section v-if="contacts.length == 0">
                    No contact founds...<br>
                    Add a contact ?
                </section>

                <ul v-else>
                    <li v-for="c in contacts"
                        :key="c._id"
                        v-bind="c">
                        <b>{{ c.contact_type }} : </b> {{ c.contact_value }}
                        <q-btn
                            size="sm"
                            color="blue-8"
                            textColor="white"
                            icon="edit"
                            label="Edit"
                            @click="selectedContact = c"
                            style="margin: 0.5dvh 0.5dvw; padding: 0.25dvh 0.5dvw;" />
                    </li>
                </ul>
                
                <ApplicationAddContact
                    :application_id="props.application._id"
                    :contact="selectedContact"
                    @contact-added="handleContactAdded" />
            </q-tab-panel>

            <q-tab-panel name="history">
                <h2>
                    <q-icon name="work_history" />
                    History
                </h2>

                <section v-if="history.length == 0">
                    History not found...<br>
                    Add history ?
                </section>

                <ul v-else>
                    <li v-for="h in history"
                        :key="h._id"
                        v-bind="h">
                        <b>{{ h.status }} :</b>&nbsp;<i>{{ h.date }}</i>
                    </li>
                </ul>
                <ApplicationAddHistory 
                    :application_id="props.application._id" 
                    @history-updated="handleHistoryUpdated"/>
            </q-tab-panel>

            <q-tab-panel name="notes">
                <h2>Notes</h2>
            </q-tab-panel>

            <q-tab-panel name="notifications">
                <h2>Notifications</h2>
            </q-tab-panel>
        </q-tab-panels>

      <!-- <q-btn label="Update application" icon="update" />
      <q-btn label="Add contact" icon="group_add" /> -->
      <q-btn @click="$emit('close')" label="Back" icon="keyboard_return" /> 
    </q-page>
</template>
    
<script setup>
    //
    import { ref, onMounted } from 'vue'
    import { findContactsByApplication } from 'src/services/db-contact'
    import { findHistory } from 'src/services/db-application'
    import ApplicationAddContact from './ApplicationAddContact.vue'
    import ApplicationAddHistory from './ApplicationAddHistory.vue'
  
    const tab = ref('contacts')
    const contacts = ref([])
    const selectedContact = ref(null)
    const history = ref([])
    const notes = ref(null)
    const notifications = ref([])

    const getContacts = async () => { contacts.value = await findContactsByApplication(props.application._id) }
    const getHistory = async () => { history.value = await findHistory(props.application._id) }
    
    const props = defineProps({
        application: Object
    })

    const handleContactAdded = () => { getContacts() }

    const handleHistoryUpdated = () => { getHistory() }
    
    onMounted(async () => {
        getContacts()
        getHistory()
        console.log('notes')
        console.log(notes.value)
        console.log('notifications')
        console.log(notifications.value)
    })
</script>
    
  <style>
    h1 {

        li {
            list-style-type: none;
            text-align: left;
            vertical-align: middle;
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

                i {
                    font-size: 3rem;
                    font-weight: lighter;
                    vertical-align: sub;
                }
            }
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