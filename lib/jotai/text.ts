import { atom } from 'jotai'

export enum SpeakerType {
  AI = 'ai',
  USER = 'user'
}

export interface DialogPart {
  speaker: SpeakerType
  text: string
  created_at?: string
  id: string
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
  (_get, set, dialogPart: DialogPart) => {
    set(dialogAtom, (prevDialog) => [...prevDialog, dialogPart])
  }
)

export const inputTextAtom = atom<string>('')
export const getSetInputTextAtom = atom(
  (get) => get(inputTextAtom),
  (_get, set, text: string) => {
    set(inputTextAtom, text)
  }
)

export const isInputLoadingAtom = atom<boolean>(false)
export const getSetIsInputLoadingAtom = atom(
  (get) => get(isInputLoadingAtom),
  (_get, set, isLoading: boolean) => {
    set(isInputLoadingAtom, isLoading)
  }
)
