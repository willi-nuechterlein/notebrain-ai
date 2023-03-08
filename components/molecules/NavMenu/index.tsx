import { useState } from 'react'
import {
  FIRST_SECTION,
  FOURTH_SECTION,
  SECOND_SECTION,
  THIRD_SECTION
} from 'lib/consts/sections'
import { useRouter } from 'next/router'
import ToggleGroupItem from 'components/atoms/ToggleGroupItem'
import ToggleGroupRoot from 'components/atoms/ToggleGroup'

const NavMenu = () => {
  const [value, setValue] = useState(FIRST_SECTION)
  const router = useRouter()

  return (
    <ToggleGroupRoot
      type="single"
      value={value}
      onValueChange={(v: string) => {
        if (v && v !== value) {
          setValue(v)
          router.push(`#${v}`)
        }
      }}
    >
      <ToggleGroupItem value={FIRST_SECTION}>{FIRST_SECTION}</ToggleGroupItem>
      <ToggleGroupItem value={SECOND_SECTION}>{SECOND_SECTION}</ToggleGroupItem>
      <ToggleGroupItem value={THIRD_SECTION}>{THIRD_SECTION}</ToggleGroupItem>
      <ToggleGroupItem value={FOURTH_SECTION}>{FOURTH_SECTION}</ToggleGroupItem>
    </ToggleGroupRoot>
  )
}

export default NavMenu
