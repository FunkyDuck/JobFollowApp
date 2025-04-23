<template>
    <h3>
        <q-icon name="update" />
        Update status
    </h3>
    
    <q-form
        @submit="onSubmit">
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
            v-model="date"
            label="Change status date"
            placeholder="ex: 12/03/2025"
            style="width:40dvw; margin:0.5dvh 0;">
            <template v-slot:prepend>
                <q-icon name="today" />
            </template>
        </q-input>

        <q-btn label="Submit" type="submit" color="primary" icon="note_add" style="margin:0.5dvh 0.5dvw;" />
    </q-form>
</template>
  
<script setup>
    import { useQuasar } from 'quasar'
    import { ref, defineEmits } from 'vue'
    import { addHistory, updateApplication } from 'src/services/db-application'

    const status_options = ['Draft', 'Applied', 'Interview', 'Offer', 'Accepted', 'Rejected', 'WithDraw', 'Archived']
    const status = ref(status_options[1])
    const date = ref(null)

    const $q = useQuasar()
    const emit = defineEmits(['history-updated'])

    const props = defineProps({
        application_id: String
    })

    const onSubmit = async () => {
        console.log(props.application_id)
        try {
            if(!date.value) {
                date.value = new Date().toISOString()
            }

            await addHistory(history => {
                history.status = status.value
                history.date = date.value
                history.application_id = props.application_id
                return history
            })

            $q.notify({
                color: 'green-8',
                textColor: 'white',
                icon: 'task',
                message: 'Application status updated'
            })

            emit('history-updated', true)
        } catch (error) {
            console.error(error)
            $q.notify({
                color: 'red-10',
                textColor: 'white',
                icon: 'error',
                message: 'Problem when update application status...'
            })
        }
    }
</script>


  