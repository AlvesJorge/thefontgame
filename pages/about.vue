<template>
  <div>
    <MainNav />
    <main id="main">
      <FontsTable
        id="fontsTable"
        :fonts="useFontHistoryStore().history.toReversed()"
      />
      <p>You may know a dozen fonts by heart, but with over 1200 fonts available, you will have to mostly guess.</p>
      <p>In the font game you will test your intuition as to if a font name fits its style</p>
      <p>Font names can sometimes have auxiliary keywords that can help you:</p>
      <ul>
        <li>
          Serif - a font with the the small line or stroke attached at the end of letters
        </li>
        <li>
          Sans Serif OR just Sans - a font without the small line or stroke attached at the end of letters
        </li>
        <li>
          Mono - all letters use the exact same size on the screen
        </li>
        <li>
          Slab - fonts with thick block like strokes.
        </li>
        <li>
          Gothic - a style of serif font usually thick ornate strokes
        </li>
        <li>
          One - Read my  <a href="https://alvesjorge.com/blog/posts/one-suffix-in-fonts.html">blog post</a> about it
        </li>
        <li>
          Script - Usually look like hand writing
        </li>
        <li>
          SC - Small caps, meaning this font comes only with upper case letters (you most likely won't encounter these as they have been filtered out)
        </li>
      </ul>
      <p>You can choose to hide these by turning them off in the options on the top right</p>
    </main>
  </div>
</template>
<style scoped>
#main{
  display:grid;
  place-content:center;
  height:90%;
}
#fontsTable{
  max-width:1000px;
  min-width:500px;
}
</style>
