<template>
    <!-- <header class="navbar navbar-toggleable-xl navbar-light ">
      <div class="container">
        <a class="navbar-brand" href="#/"></a>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="profile">Profile</router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#/settings">Settings</a>
          </li>
        </ul>
      </div>
    </header> -->

  <b-navbar toggleable="md" type="light" variant="white" :sticky="true">
    <b-navbar-brand :to="{ name: 'home' }">ScuttleVue❈</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Public</b-nav-item>
        <b-nav-item :to="{ name: 'profile' }">Profile</b-nav-item>
        <b-nav-item href="#" disabled>Scroller</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form disabled>
          <b-form-input disabled size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button disabled size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-nav-item :to="{ name: 'profile' }">Profile</b-nav-item>

          <b-dropdown-item disabled href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>
