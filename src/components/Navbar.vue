<template>
  <b-navbar toggleable="md" type="light" variant="white" :sticky="true">
    <b-navbar-brand :to="{ name: 'home' }">ScuttleVue❈</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Public</b-nav-item>
        <b-nav-item :to="{ name: 'profile' }">Profile</b-nav-item>
        <b-nav-item :to="{ name: 'settings' }">Settings</b-nav-item>
        <!-- <b-nav-item :to="{ name: 'hot' }">Hot</b-nav-item> -->
        <!-- <b-nav-item :to="{ name: 'scroller' }" disabled>Scroller</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>
