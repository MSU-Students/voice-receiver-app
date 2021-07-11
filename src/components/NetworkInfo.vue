<template>
  <div class="q-pa-md">
    <q-form @submit="save()" class="q-gutter-md">
      <q-input
        dense
        filled
        v-model="server_ip.ipAddress"
        label="IP Address"
        hint="ex. 192.168.100.1"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something.']"
      />

      <q-input 
        dense
        filled
        type="number"
        v-model="server_ip.port"
        label="Port"
        hint="ex. 8080"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type port #.'
        ]"
      />

      <div>
        <q-btn
          :loading="showSubmitLoader"
          class="full-width"    
          label="Save"
          type="submit"
          color="indigo"
        >
          <!-- <template v-slot:loading>
            <q-spinner-ios v-if="showSubmitLoader" class="on-left" />
          </template> -->
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
import serverConnectionService from "../services/server-connection.service.js"
export default {
    data() {
        return {
            showSubmitLoader: false,
            server: {
                ipAddress: '',
                port: ''
            },
            server_ip: {}
        }
    },
    mounted() {
        this.getIP();    
    },
    methods: {
        async save() {
            this.showSubmitLoader = true;
            await serverConnectionService.addServerIP("server_ip", this.server_ip).then(() => {
                setTimeout(() => {
                    this.showSubmitLoader = false;
                }, 2000)
            })
        },
        async getIP() {
            const ip = await serverConnectionService.getIpAddress();
            this.server_ip = ip;
            console.log('port', this.server_ip.port);
        }
    
    }
}
</script>