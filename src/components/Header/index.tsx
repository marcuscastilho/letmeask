import { RoomCode } from '../RoomCode'

import { useTheme } from '../../hooks/useTheme'

import logoImg from '../../assets/images/logo.svg'
import logoWhiteImg from '../../assets/images/logoWhite.svg'
import { Button } from '../Button'
import './style.scss'

type HeaderProps = {
  roomId: string
  handleEndRoom?: () => void
  isAdmin?: boolean
}

export function Header({
  roomId,
  handleEndRoom,
  isAdmin = false
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  return (
    <header>
      <div className={`content ${theme}`}>
        <img src={theme === 'dark' ? logoWhiteImg : logoImg } alt="Letmeask" />
        <Button onClick={toggleTheme} isOutlined>
          {theme} mode
        </Button>
        <RoomCode code={roomId} />

        {isAdmin && (
          <Button onClick={handleEndRoom} isOutlined>
            Encerrar sala
          </Button>
        )}
      </div>
    </header>
  )
}
