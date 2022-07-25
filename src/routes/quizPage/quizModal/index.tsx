import styles from './modal.module.scss'

import Button from 'components/Button'
import { useSetRecoilState } from 'recoil'
import { wrongAnswerListState } from 'state/quiz'
import store from 'storejs'
import { IQuizResult } from 'types/quiz'

interface Props {
  setIsOpenPopup: Function
  setPage: Function
  quiz: IQuizResult
  check: boolean
}

const QuizModal = ({ setIsOpenPopup, setPage, check, quiz }: Props) => {
  const setWrongAnswerList = useSetRecoilState(wrongAnswerListState)

  const handleCloseButtonClick = () => {
    setIsOpenPopup(false)
    setPage((prev: number) => prev + 1)
    if (!check) {
      setWrongAnswerList((pre) => {
        if ([...pre].find((item) => quiz === item)) {
          store.set('wrongNote', [...pre])
          return [...pre]
        }
        store.set('wrongNote', [...pre, quiz])
        return [...pre, quiz]
      })
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        <span>{check ? '정답 입니다!😎' : '오답 입니다!🙁'}</span>
        <Button size='extraLarge' onClick={handleCloseButtonClick} primary>
          다음문제 풀기
        </Button>
      </div>
    </div>
  )
}

export default QuizModal