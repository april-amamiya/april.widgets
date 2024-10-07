<script setup lang="ts">
import CloseIcon from '~icons/carbon/close-large'
import MaximizeIcon from '~icons/carbon/maximize'
import MinimizeIcon from '~icons/carbon/minimize'
import TerminalIcon from '~icons/carbon/terminal'
</script>

<template>
  <header class="grid grid-cols-3 items-center bg-neutral-950/95 p-4 font-black leading-none">
    <div class="text-start text-neutral-500">
      <TerminalIcon />
    </div>

    <div class="text-center uppercase">
      <slot />
    </div>

    <div class="flex items-center justify-end gap-4 text-end">
      <MinimizeIcon class="text-neutral-500 outline-neutral-800" />
      <MaximizeIcon class="text-neutral-500 outline-neutral-800" />
      <CloseIcon class="text-neutral-500 outline-neutral-800" />
    </div>
  </header>
</template>
