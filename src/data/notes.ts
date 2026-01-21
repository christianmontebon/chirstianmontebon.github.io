import helloWorldRaw from '../content/notes/hello-world.md?raw'
import complexSampleRaw from '../content/notes/complex-sample.md?raw'

export type Note = {
  path: string
  title: string
  tags: string[]
}

export const notes: Note[] = [
  {
    path: 'content/notes/hello-world.md',
    title: 'Hello World',
    tags: ['intro', 'personal'],
  },
  {
    path: 'content/notes/complex-sample.md',
    title: 'Complex Sample',
    tags: ['demo', 'formatting'],
  },
]

export const noteContentByPath: Record<string, string> = {
  'content/notes/hello-world.md': helloWorldRaw,
  'content/notes/complex-sample.md': complexSampleRaw,
}

