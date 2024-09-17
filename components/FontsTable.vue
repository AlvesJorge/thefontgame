<script setup>
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table";

const DEMO_TEXT = "The quick brown fox jumps over the lazy dog.";

const props = defineProps({
  fonts: Array
});

const columns = ref([
  {
    accessorKey: "name",
    header: () => h("div", "Name"),
    cell: ({ row }) => {
      return h("a", { href: row.original["externalShowcaseURL"], target: "_blank", class: "font-medium" }, row.getValue("name"));
    },
  },
  {
    accessorKey: "demo",
    header: () => h("div", "Demo"),
    cell: ({ row }) => {
      return h("h3", { style: `font-family: ${row.getValue("name")}`, class: "font-medium" }, DEMO_TEXT);
    },
  }
]);

const table = ref(
  useVueTable({
    data: props.fonts,
    columns: columns.value,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
);

onBeforeMount(() => {
  props.fonts.forEach((font) => importFont(font["stylesheetURL"]));
});
</script>

<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table class="text-xl">
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template
              v-for="row in table.getRowModel().rows"
              :key="row.id"
            >
              <TableRow>
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getRowModel().rows?.length }} of
        {{ props.fonts.length }}.
      </div>
      <div
        v-if="table.getRowModel().rows?.length < props.fonts.length"
        class="space-x-2"
      >
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
a {
 color: hsl(var(--primary));
}
</style>
