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
  (_get, set, dialog: Array<DialogPart>) => {
    set(dialogAtom, dialog)
  }
)

export const addDialogPartAtom = atom(
  null,
  (get, set, dialogPart: DialogPart) => {
    set(dialogAtom, (prevDialog) => [...prevDialog, dialogPart])
  }
)
