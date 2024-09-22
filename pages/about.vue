<template>
  <div>
    <MainNav />
    <main id="main">
      <Card>
        <CardHeader>
          <CardTitle>About the game</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test your <b>intuition</b> and get to see some fonts you otherwise might have never seen.</p>
          <p>You may know a dozen fonts by heart, but with over <b>1200 fonts available</b>, you will have to mostly guess.</p>
          <p>While developing this game I've gotten better at recognizing many fonts and <b>consistently</b> get better correct percentage than the odds of just guessing!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <p>My <b>biggest tip</b> is to use your intuition, I think most people can know which of the following fonts is <b>Pirata</b> and which one is <b>Gamja Flower</b>.</p>
          <p class="w-fit block mx-auto">
            <span id="pirataFont">Font One</span> | <span id="flowerFont">Font Two</span>
          </p>
          <br>
          <p>Font names <b>sometimes</b> can already have auxiliary keywords that can help you in your answers:</p>
          <Table class="w-fit">
            <TableCaption>Useful keywords in font names</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">
                  Keyword
                </TableHead>
                <TableHead>
                  Explanation
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">
                  Serif
                </TableCell>
                <TableCell>
                  a font with the the small line or stroke attached at the end of letters
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">
                  Sans Serif OR just Sans
                </TableCell>
                <TableCell>
                  a font without the small line or stroke attached at the end of letters
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  Mono
                </TableCell>
                <TableCell>
                  a font without the small line or stroke attached at the end of letters
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  Slab
                </TableCell>
                <TableCell>
                  fonts with thick block like strokes.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  Gothic
                </TableCell>
                <TableCell>
                  a style of serif font usually thick ornate strokes
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  One
                </TableCell>
                <TableCell>
                  Read my  <a
                    class="text-blue-500"
                    href="https://alvesjorge.com/blog/posts/one-suffix-in-fonts.html"
                  >blog post</a> about it
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  Script
                </TableCell>
                <TableCell>
                  Usually look like hand writing
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell class="font-medium">
                  SC
                </TableCell>
                <TableCell>
                  Small caps, meaning this font comes only with upper case letters (you most likely won't encounter these as they have been filtered out)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br>
          <p>You can choose to hide most of these by turning them off in the options on the top right.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            If you have any questions, inquiries or bug reports you can reach out to me via email
            <a
              class="text-blue-500"
              href="mailto:jorgermalves@protonmail.com"
            >
              jorgermalves@protonmail.com
            </a> or raise an issue in the
            <a
              class="text-blue-500"
              href="https://github.com/alvesjorge/thefontgame"
            >github repo </a>.
          </p>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Pirata+One&display=swap");

#main{
  display:grid;
  gap:1rem;
  place-content:center;
  height:90%;
  width:80%;
  margin:0 auto;
  font-size: 1.2rem;
  padding:2rem;
}
#pirataFont{
    font-family: "Pirata One";
    font-size: 2rem;
}
#flowerFont{
    font-family: "Gamja Flower";
    font-size: 2.5rem;
}
</style>
