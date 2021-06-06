<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat>
      <q-toolbar class="text-white bg-indigo-8">
        <q-btn flat round dense icon="speaker" />
        <q-toolbar-title>Voice Receiver</q-toolbar-title>
        <q-space />
        <q-badge color="yellow">v0.0.1</q-badge>
        <q-btn flat round dense icon="mic" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
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
