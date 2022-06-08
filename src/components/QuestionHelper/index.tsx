
import React, { useCallback, useState } from 'react'
import { HelpCircle as Question } from 'react-feather'
import styled from 'styled-components'
import Tooltip from '../Tooltip'

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme, backgroundNone }) => (backgroundNone ? 'none' : theme.bg2)};
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const LightQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const DarkQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 24px;
  height: 24px;
  background: #1E1E1E;
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const InlineQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 16px;
  height: 16px;
  background-color: #616161;
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionMark = styled.span`
  font-size: 1rem;
`

export default function QuestionHelper({ text, backgroundNone }: { text: string; backgroundNone?: boolean | false }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show}>
        <QuestionWrapper backgroundNone={backgroundNone} onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <Question size={16} />
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}

export function LightQuestionHelper({ text, AdditionalStyle }: { text: string; AdditionalStyle?: object }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={AdditionalStyle ? AdditionalStyle : { marginLeft: 4 }}>
      <Tooltip text={text} show={show} onMouseEnter={open} onMouseLeave={close}>
        <LightQuestionWrapper onClick={open} onMouseEnter={open}>
          <QuestionMark>?</QuestionMark>
        </LightQuestionWrapper>
      </Tooltip>
    </span>
  )
}

export function DarkQuestionHelper({ text }: { text: string }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <div style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show} onMouseEnter={open} onMouseLeave={close}>
        <DarkQuestionWrapper onClick={open} onMouseEnter={open}>
          <QuestionMark>?</QuestionMark>
        </DarkQuestionWrapper>
      </Tooltip>
    </div>
  )
}

export function InlineQuestionHelper({ text, AdditionalStyle }: { text: string; AdditionalStyle?: object }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={AdditionalStyle ? AdditionalStyle : { marginLeft: 10 }}>
      <Tooltip text={text} show={show} onMouseEnter={open} onMouseLeave={close}>
        <InlineQuestionWrapper onClick={open} onMouseEnter={open}>
          <QuestionMark>?</QuestionMark>
        </InlineQuestionWrapper>
      </Tooltip>
    </span>
  )
}
