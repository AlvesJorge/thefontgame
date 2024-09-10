<script lang="js">
import { useOptionsStore } from "../helpers/stores/options";

export default {
  data() {
    return {
      options: useOptionsStore()
    };
  },
};
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          style="display: inline-block; align-self:center; margin-right:0.5rem;"
        >
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
        Options
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Options</SheetTitle>
        <SheetDescription>
          Options to make the game more/less fun, it's up to you.
        </SheetDescription>
      </SheetHeader>
      <NumberField
        id="numberOfAnswerOptionsInput"
        v-model="options.numberOfAnswerOptions"
        :min="2"
        class="my-4"
      >
        <h2>
          Number of answer options
          <Button
            variant="ghost"
            @click="options.resetNumberOfAnswerOptions"
          >
            Reset
          </Button>
        </h2>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <hr class="my-5">
      <h2>
        Phrases to showcase the font
        <Button
          variant="ghost"
          @click="options.resetExampleTexts"
        >
          Reset
        </Button>
      </h2>
      <TagsInput v-model="options.exampleTexts">
        <TagsInputItem
          v-for="item in options.exampleTexts"
          :key="item"
          class="tags-input-items"
          :value="item"
        >
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="add more..." />
      </TagsInput>
    </SheetContent>
  </Sheet>
</template>
<style lang="css" scoped>
 .tags-input-items{
  border: 2px solid hsl(var(--border));
  height:fit-content
}
</style>
