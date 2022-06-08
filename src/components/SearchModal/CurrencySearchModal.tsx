// @ts-nocheck
import { Token, Currency } from 'nimbus-swap-mod/sdk'
import React, { useCallback, useEffect, useState } from 'react'
import useLast from '../../hooks/useLast'
import Modal from '../Modal'
import { CurrencySearch } from './CurrencySearch'
import { ListSelect } from './ListSelect'
import { ImportToken } from './ImportToken'

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  customTokens?: any
  isShowETH?: boolean
  direction?: string
  direct?: string
  process?: string
  disableToActiveToken?: boolean
}

export enum CurrencyModalView {
  search,
  manage,
  importToken,
  importList
}

export default function CurrencySearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
  customTokens,
  isShowETH,
  direction,
  direct,
  process,
  disableToActiveToken
}: CurrencySearchModalProps) {
  const [listView, setListView] = useState<boolean>(false)
  const lastOpen = useLast(isOpen)
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.manage)
  // const prevView = setModalView(CurrencyModalView.manage)
  const [importToken, setImportToken] = useState<Token | undefined>()

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false)
      setModalView(CurrencyModalView.search)
    }
  }, [isOpen, lastOpen])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  const handleClickChangeList = useCallback(() => {
    setListView(true)
  }, [])
  const handleClickBack = useCallback(() => {
    setListView(false)
  }, [])

  // const minHeight = modalView === CurrencyModalView.importToken || modalView === CurrencyModalView.importList ? 40 : 80

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={80} minHeight={listView ? 40 : 80}>
      {listView ? (
        <ListSelect onDismiss={onDismiss} onBack={handleClickBack} />
      ) : modalView === CurrencyModalView.search ? (
        <CurrencySearch
          isOpen={isOpen}
          onDismiss={onDismiss}
          onCurrencySelect={handleCurrencySelect}
          onChangeList={handleClickChangeList}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
          customTokens={customTokens}
          showImportView={() => setModalView(CurrencyModalView.importToken)}
          setImportToken={setImportToken}
          isShowETH={isShowETH}
          direction={direction}
          direct={direct}
          process={process}
          disableToActiveToken={disableToActiveToken}
        />
      ) : modalView === CurrencyModalView.importToken && importToken ? (
        <ImportToken
          tokens={[importToken]}
          onDismiss={onDismiss}
          list={importToken ? importToken?.list : undefined}
          onBack={() => setModalView(CurrencyModalView.search)}
          handleCurrencySelect={handleCurrencySelect}
        />
      ) : null}
    </Modal>
  )
}
