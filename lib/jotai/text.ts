import { atom } from 'jotai'

export enum SpeakerType {
  AI = 'ai',
  USER = 'user'
}

interface DialogPart {
  speaker: SpeakerType
  text: string
}

export const dialogAtom = atom<Array<DialogPart>>([])

export const getSetDialogAtom = atom(
  (get) => get(dialogAtom),
  (get, set, dialogPart: DialogPart) => {
    set(dialogAtom, [...get(dialogAtom), dialogPart])
  }
)
