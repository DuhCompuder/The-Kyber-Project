<template>
  <div v-html="legacySystemHTML">
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Just like JSX! Oh wait...
      legacySystemHTML: `
        <FONT color="#faddad" size="-2">
          <MARQUEE>Please enter your name to continue.</MARQUEE>
          ...
        </FONT>
      `
    }
  }
}
</script>