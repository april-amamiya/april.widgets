import type { roleList } from './roles'
import { tv } from 'tailwind-variants'

export const roleStyle = tv({
  base: 'px-1 text-neutral-950',
  variants: {
    role: {
      bro: 'bg-red-500',
      mod: 'bg-lime-300',
      sub: 'bg-blue-300',
      vip: 'bg-rose-300',
      art: 'bg-cyan-300',
      view: 'bg-slate-300',
    } as Record<ReturnType<typeof roleList>[number], string>,

    visual: {
      text: 'text-neutral-300',
      meta: 'text-amber-300',
    },
  },
})
