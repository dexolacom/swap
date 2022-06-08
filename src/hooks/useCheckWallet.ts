import { useHistory } from 'react-router'
import { useState } from 'react'

export const useCheckWallet = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const modalHandler = () => {
    setModalOpen(!modalOpen)
  }
  const history = useHistory()
  function checkWallet(_e: Event, account: any, linkTo: string, checkToken = false) {
    _e.preventDefault()
    if (account && !checkToken) {
      history.push(linkTo)
    } else if (account && checkToken) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') == 'null') {
        modalHandler()
      } else {
        history.push(linkTo)
      }
    } else {
      modalHandler()
    }
  }
  return { modalOpen, checkWallet, modalHandler }
}
