<template>
  <div>
    <h1>Other Project</h1>

    <div style="margin-bottom: 30px;">
      And here are some other Other Project I've made or heavily contributed to, which are totally different than the stuff from earlier.
    </div>
    <ProjectsList v-bind:projects="projects" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectsList from "@/components/ProjectsList.vue";
import otherProjectsData from "@/data/ExtracData.ts";

export default Vue.extend({
  name: "OtherProjects",
  components: {
    ProjectsList,
  },
  data: function () {
    return {
      projects: otherProjectsData,
    };
  },
});
</script>
