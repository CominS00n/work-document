<template>
    <v-container>
        <v-row>
        <v-col cols="12">
            <h1>Project Documentation</h1>
            <p>Current path: {{ route.params.id }} + {{ route.params.title }}</p>
        </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>