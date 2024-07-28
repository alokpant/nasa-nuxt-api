<template>
  <div v-if="project">
    <h1>{{ project.name }}</h1>
    <p>{{ project.description }}</p>
    <h2>Organizations</h2>
    <ul>
      <li v-for="org in project.organizations" :key="org.id">{{ org.name }}</li>
    </ul>
    <h2>Contacts</h2>
    <ul>
      <li v-for="contact in project.contacts" :key="contact.id">{{ contact.name }} - {{ contact.role }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);
const project = ref(null);

console.log(route.params, 'route params')


onMounted(async () => {
  const pid = useRoute().params.pid;
  loading.value = true
  try {
    
    const response = await fetch(`/api/projects/${pid}`);
    project.value = await response.json()
  } catch (error) {
    console.log(error)
    loading.value = false
  }
})
</script>
