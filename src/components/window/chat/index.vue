<script setup lang="ts">
import { useChat } from '@/composables/chat'
import { styles } from './styles'

const { messages } = useChat()

const itemsRef = useTemplateRef<HTMLElement>('itemsRef')

watchDebounced(messages, () => {
  if (itemsRef.value) {
    const { lastElementChild } = itemsRef.value
    if (lastElementChild) {
      lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
}, { debounce: 1000 })
</script>

<template>
  <section class="grid size-full grid-rows-[auto_1fr]">
    <TerminalHeader>
      sawich@irc.twitch.tv
    </TerminalHeader>

    <section class="flex overflow-hidden bg-neutral-950/95 p-2">
      <section ref="itemsRef" class="flex h-full flex-col overflow-hidden">
        <p v-for="{ uuid, name, time, role, text } of messages" :key="uuid">
          <span class="text-amber-300">[{{ time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}] <span class="underline">{{ name }}</span> <span v-if="role !== 'view'" :class="styles({ role })">{{ role }}</span> ~ </span>
          <span class="text-amber-300">{{ text }}</span>
        </p>
      </section>
    </section>
  </section>
</template>
