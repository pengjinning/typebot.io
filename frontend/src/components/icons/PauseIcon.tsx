import { Icon, IconProps } from '@chakra-ui/react'

export const PauseIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
    />
  </Icon>
)

export default PauseIcon 