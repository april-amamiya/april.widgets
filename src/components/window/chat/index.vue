<script setup lang="ts">
import { useChat } from '@/composables/chat'
import { useRouterChannel } from '@/composables/router'
import { roleStyle } from './role-style'
import { textStyle } from './text-style'

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

const channel = useRouterChannel()
</script>

<template>
  <section class="grid size-full grid-rows-[auto_1fr]">
    <TerminalHeader>
      {{ channel }}@irc.twitch.tv
    </TerminalHeader>

    <section class="flex overflow-hidden bg-neutral-950/95 p-2">
      <section ref="itemsRef" class="flex h-full flex-col overflow-hidden">
        <p v-for="{ uuid, name, time, role, text } of messages" :key="uuid">
          <span :class="textStyle({ visual: 'text' })"><span :class="textStyle({ visual: 'meta' })">{{ time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }} |</span> <i>{{ name }}</i> <span v-if="role !== 'view'" :class="roleStyle({ role })">{{ role }}</span><span :class="textStyle({ visual: 'meta' })"> ~ </span></span>
          <span :class="textStyle({ visual: 'text' })">{{ text }}</span>
        </p>
      </section>
    </section>
  </section>
</template>
