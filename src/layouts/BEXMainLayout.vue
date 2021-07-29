<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);">
      <q-toolbar v-if="['/popup'].find(p => p == $route.path)">
        <q-btn flat round dense icon="speaker" />
        <q-toolbar-title>Voice Receiver</q-toolbar-title>
        <q-space />
          <q-btn
            class="text-overline"
            outline
            rounded
            icon="maps_home_work"
            color="white"
            label="Manage Network" 
            @click="() => $router.replace('/office')"
            no-caps
          >
          </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
      
      <q-footer >
        <q-toolbar class="bg-white">
          <q-toolbar-title>
            <div class="text-overline text-blue-grey">
              MSU Marawi PA System | Developed by Omair M.
            </div>
            </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  
  data () {
    return {

    }
  }
}
</script>
