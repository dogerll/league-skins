import { useConfirm } from '@renderer/hooks/Confirm'
import DownloadIcon from '@renderer/components/svgs/DownloadIcon'

export default function UpdateButton({
  onUpdate: onUpdate
}: {
  onUpdate: () => void
}): JSX.Element {
  const { setConfirmProps } = useConfirm()

  const updateHandler = (): void => {
    setConfirmProps({
      title: 'Skins Update',
      message: 'Are you sure you want to download the latest skins?',
      onConfirm: onUpdate
    })
  }

  return (
    <button className="update-button" onClick={updateHandler}>
      <DownloadIcon />
    </button>
  )
}
