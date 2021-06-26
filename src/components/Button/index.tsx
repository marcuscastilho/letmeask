import { ButtonHTMLAttributes } from 'react'

import { useTheme } from '../../hooks/useTheme'
import './style.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined ?: boolean;

}

export function Button({isOutlined = false,...props}: ButtonProps){
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''} ${theme}`}  
      {...props}
    />
  )
}