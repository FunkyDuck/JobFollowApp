<template>
        <h3>
            <q-icon name="person_add" />
            Add contact
        </h3>
      
        <q-form
            @submit="onSubmit">
            <q-select
                outlined
                v-model="contact_type"
                label="Contact Type"
                :options="contact_type_options" 
                style="width:40dvw; margin:0.5dvh 0;">
                <!-- <template v-slot:prepend>
                    <q-icon name="support_agent" />
                </template> -->
            </q-select>

            <q-input 
                outlined
                v-model="contact_value"
                label="Value"
                placeholder="ex: Paul Ochon || p.ochon@mail.com"
                style="width:40dvw; margin:0.5dvh 0;" >
                <!-- <template v-slot:prepend>
                    <q-icon name="work" />
                </template> -->
            </q-input>

            <q-btn label="Submit" type="submit" color="primary" icon="note_add" style="margin:0.5dvh 0.5dvw;" />
            <q-btn @click="deleteData" color="red-10" textColor="white" icon="delete" label="Delete" style="margin: 0.5dvh 0.5dvw;" />
        </q-form>
</template>
  
<script setup>
    import { ref, defineEmits, watch } from 'vue'
    import { useQuasar } from 'quasar'
    import { addContactToApplication, removeContactToApplication, updateContactToApplication } from 'src/services/db-contact'

    const $q = useQuasar()
    const emit = defineEmits(['contact-added'])

    const contact_type = ref(null)
    const contact_value = ref(null)
    const contact_id = ref(null)

    const contact_type_options = [
        'person_name',
        'person_email',
        'person_phone',
        'person_role',
        'person_linkedin',
        'person_notes',
        'company_name',
        'company_address',
        'company_website',
        'company_email',
        'company_phone',
        'company_sector',
        'company_notes',
        'other_social',
        'other_source',
        'other_internal',
        'other_reference'
    ]

    const props = defineProps({
        application_id: String,
        contact: {
            type: Object,
            default: null
        }
    })

    watch(() => props.contact, (newVal) => {
        if(newVal) {
            contact_type.value = newVal.contact_type
            contact_value.value = newVal.contact_value
            contact_id.value = newVal._id
            console.log('NEWVAL ID :: ', newVal._id)
        }
        else {
            contact_type.value = null
            contact_value.value = null
        }
    })

    const onSubmit = async () => {
        console.log(props.application_id)

        if(contact_value.value === null || contact_value.value === '') {
            $q.notify({
                color: 'orange-5',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to add a value for the contact...'
            })
        }
        else {
            try {
                if(!props.contact || !props.contact._id){
                    const newContact = await addContactToApplication((contact) => {
                        contact.contact_value = contact_value.value
                        contact.contact_type = contact_type.value
                        contact.application_id = props.application_id

                        return contact
                    })

                    setTimeout(() => {
                        contact_type.value = null
                        contact_value.value = null
                    }, 10);

                    $q.notify({
                        color: 'green-8',
                        textColor: 'white',
                        icon: 'task',
                        message: 'Contact added successfully'
                    })

                    emit('contact-added', newContact)
                }
                else {
                    const newContact = await updateContactToApplication(contact_id.value, {contact_value: contact_value.value,contact_type: contact_type.value,application_id: props.application_id})

                    setTimeout(() => {
                        contact_type.value = null
                        contact_value.value = null
                        contact_id.value = null
                    }, 10);

                    $q.notify({
                        color: 'green-8',
                        textColor: 'white',
                        icon: 'task',
                        message: 'Contact updated successfully'
                    })

                    emit('contact-added', newContact)
                }
            } catch (error) {
                console.error(error)
                $q.notify({
                    color: 'red-10',
                    textColor: 'white',
                    icon: 'danger',
                    message: 'Problem when register contact...'
                })
            }
        }
    }

    const deleteData = async () => {
        try {
            const deletedContact = await removeContactToApplication(contact_id.value)

            setTimeout(() => {
                contact_type.value = null
                contact_value.value = null
                contact_id.value = null
            }, 10);

            $q.notify({
                color: 'green-8',
                textColor: 'white',
                icon: 'task',
                message: 'Contact deleted successfully'
            })

            emit('contact-added', deletedContact)
        } catch (error) {
            console.log(error)
            $q.notify({
                color: 'red-10',
                textColor: 'white',
                icon: 'danger',
                message: 'Problem for deleting contact...'
            })
        }
    }
</script>
  