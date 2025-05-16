import { useContext } from 'react'
import ConfirmDialogContext from '@/context/ConfirmDialogProvider'

const useConfirmDialog = () => {
  return useContext(ConfirmDialogContext)
}

export default useConfirmDialog
