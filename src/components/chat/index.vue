<script setup lang="ts">
import type { roles } from './roles'

import { fakerRU as faker } from '@faker-js/faker'
import { styles } from './styles'

function users() {
  function user(role: ReturnType<typeof roles>[number]) {
    return {
      role,
      name: faker.internet.userName(),
      color: faker.internet.color(),
    }
  }

  return [
    user('bro'),
    ...Array.from({ length: faker.number.int({ min: 1, max: 10 }) }).map(() => user('vip')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => user('art')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => user('mod')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 15 }) }).map(() => user('view')),
  ]
}

function messages() {
  const list = users()

  return Array.from({ length: 0 }, () => ({
    uuid: faker.string.uuid(),
    ...faker.helpers.arrayElement(list),
    text: faker.hacker.phrase(),
  }))
}

const list = reactive(messages())

const itemsRef = useTemplateRef<HTMLElement>('itemsRef')

watchDebounced(list, () => {
  if (itemsRef.value) {
    const lastItemRef = itemsRef.value.lastElementChild
    if (lastItemRef) {
      lastItemRef.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
}, { debounce: 500 })

function create() {
  const u = users()

  list.push({
    uuid: faker.string.uuid(),
    ...faker.helpers.arrayElement(u),
    text: faker.hacker.phrase(),
  })

  if (list.length > 50) {
    list.shift()
  }

  message()
}

function message() {
  setTimeout(create, faker.number.int({ min: 100, max: 700 }))
}

create()
</script>

<template>
  <section class="grid size-full grid-rows-[auto_1fr]">
    <TerminalHeader>
      chat
    </TerminalHeader>

    <section class="flex overflow-hidden bg-neutral-950/95 p-2">
      <section ref="itemsRef" class="flex flex-col overflow-hidden">
        <p v-for="{ uuid, name, role, text } of list" :key="uuid">
          <span class="text-indigo-300">TV <span class="text-amber-300 underline">{{ name }}</span> <span :class="styles({ role })">{{ role }}</span> ~ </span>
          <span class="text-amber-300">{{ text }}</span>
        </p>
      </section>
    </section>
  </section>
</template>
