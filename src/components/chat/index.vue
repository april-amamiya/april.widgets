<script setup lang="ts">
import { fakerRU as faker } from '@faker-js/faker'
import { reactive, useTemplateRef } from 'vue'

import { roles } from './roles'
import { styles } from './styles'

function users() {
  const list = roles()

  return Array.from({ length: 8 }).map(() => ({
    role: faker.helpers.arrayElement(list),
    name: faker.internet.userName(),
    color: faker.internet.color(),
  }))
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

const xxx = useTemplateRef<HTMLDivElement>('xxx')

function message() {
  setTimeout(() => {
    const u = users()

    list.push({
      uuid: faker.string.uuid(),
      ...faker.helpers.arrayElement(u),
      text: faker.hacker.phrase(),
    })

    if (list.length > 50) {
      list.shift()
    }

    if (xxx.value) {
      xxx.value.scrollTop = xxx.value.scrollHeight
    }

    message()
  }, 1000)
}

message()
</script>

<template>
  <section class="grid size-full grid-rows-[auto_1fr]">
    <TerminalHeader>
      chat
    </TerminalHeader>

    <section class="flex flex-col-reverse overflow-hidden bg-neutral-950/95 p-2">
      <section ref="xxx">
        <p v-for="{ uuid, name, role, text } of list" :key="uuid">
          <span class="text-amber-300">TV <span class="underline">{{ name }}</span> <span :class="styles({ role })">{{ role }}</span>
            ~ </span>
          <span class="text-amber-200">{{ text }}</span>
        </p>
      </section>
    </section>
  </section>
</template>
