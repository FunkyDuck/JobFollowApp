<template>
    <q-page class="flex flex-center">
        <h1>
            <q-icon name="list_alt" />
            Applications list
        </h1>

        <q-list>
          <q-item-label v-for="item in applications"
            :key="item.title"
            v-bind="item">
            {{ item.title }}
          </q-item-label>
        </q-list>
    </q-page>
  </template>
  
  <script setup>
  //
  </script>
  