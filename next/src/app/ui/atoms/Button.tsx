'use client'

import './Button.scss'
import { MouseEventHandler, ReactNode } from 'react'
import { Button as PRButton } from 'primereact/button'

type ButtonProps = {
  className?: string
  severity?: 'primary' | 'secondary'
  variant?: 'filled' | 'invisible'
  label?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
  text?: boolean
  onClick?: MouseEventHandler
}

const Button = ({
  severity = 'primary',
  variant = 'filled',
  ...props
}: ButtonProps) => {
  return (
    <PRButton
      className={`button button--${severity} button--${variant} ${
        props.className ?? ''
      }`}
      disabled={props.disabled}
      text={props.text}
      size="small"
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.iconLeft && props.iconLeft}
      {props.label && <span className="p-button-label">{props.label}</span>}
      {props.iconRight && props.iconRight}
    </PRButton>
  )
}

export default Button