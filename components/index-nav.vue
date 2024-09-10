<script lang="js">

export default {
  data() {
    return {
      colorMode: useColorMode(),
    };
  },
  methods: {
    changeToDarkMode() {
      console.log("ACTIVATE DARK MODE");
      console.log(this.colorMode);
      this.colorMode.preference = "dark";
    }
  }
};
</script>

<template>
  <NavigationMenu id="navigationMenu">
    <NavigationMenuList>
      <NavigationMenuItem>
        <Button
          variant="ghost"
          @click="colorMode.preference='light'"
        >
          Light Mode
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button
          variant="ghost"
          @click="changeToDarkMode"
        >
          Dark Mode
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <OptionsSheet />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
<style scoped>
#navigationMenu{
  justify-items: end;
  width:100%;
  display:grid;
}
</style>
