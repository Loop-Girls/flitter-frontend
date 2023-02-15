<template>
    <div class="container">
      <div class="card" v-if="loggedUser">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="loggedUser.avatar"
              class="img-fluid rounded-start"
              :alt="loggedUser.username"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ loggedUser.username }}</h5>
              <p class="card-text">
                {{ loggedUser.email }}
              </p>
              <p class="card-text">
                <small class="text-muted">{{ loggedUser.role }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import useAuth from "@/composables/useAuth";
  export default {
    setup() {
      const { getProfile, loggedUser } = useAuth();
      
      getProfile();
      return {
        loggedUser,
      };
    },
  };
  </script>
  
  <style>
  </style>