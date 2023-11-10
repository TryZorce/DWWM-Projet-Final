import './LinkButton.scss'
import { ReactNode } from 'react'
import Link from 'next/link'

type LinkButtonProps = {
  href: string
  label?: string
  severity?: 'primary' | 'secondary'
  iconLeft?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
}

const LinkButton = ({ severity = 'primary', ...props }: LinkButtonProps) => {
  return (
    <Link
      className={`link__button link__button--${severity} p-button p-component button p-button-sm ${
        props.disabled ? 'p-disabled' : 'p-abled'
      }`}
      href={props.href}
      tabIndex={props.disabled ? -1 : 0}
    >
      {props.iconLeft && props.iconLeft}
      {props.label && <span className="p-button-label">{props.label}</span>}
      {props.iconRight && props.iconRight}
    </Link>
  )
}

export default LinkButton