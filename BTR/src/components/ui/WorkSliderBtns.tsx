import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import { useSwiper } from 'swiper/react'

interface WorkSliderBtnsProps {
  containerStyle: string;
  buttonStyle: string;
  iconStyle: string;
}

function WorkSliderBtns({containerStyle, buttonStyle, iconStyle}: WorkSliderBtnsProps) {
    const swiper = useSwiper()
  return (
    <div className={containerStyle}>
        <button className={buttonStyle} aria-label="Précédent" onClick={() => swiper.slidePrev()}>
            <PiCaretLeftBold className={iconStyle} />
        </button>
        <button className={buttonStyle} aria-label="Suivant" onClick={() => swiper.slideNext()}>
            <PiCaretRightBold className={iconStyle} />
        </button>
    </div>
  )
}

export default WorkSliderBtns
