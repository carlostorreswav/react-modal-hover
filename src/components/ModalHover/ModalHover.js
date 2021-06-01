import { useRef } from 'react'
import ModalHoverContent from '../ModalHoverContent/ModalHoverContent'
import './ModalHover.css'

const ModelHover = (props) => {

    const fakePosRef = useRef({})

    const idBack = useRef({})
    const idChild = useRef({})
    const idCont = useRef({})

    const openBack = () => {
        document.getElementById(idBack.current).style.display = "block"
        document.getElementById(idBack.current).classList.add("OpenBack")
        document.getElementById(idChild.current).style.position = "relative"
    }

    const openCont = () => {
        document.getElementById(idCont.current).style.display = "block"
        document.getElementById(idCont.current).classList.add("OpenBack")
    }

    const closeBack = () => {
        document.getElementById(idBack.current).classList.remove("OpenBack")
        document.getElementById(idBack.current).classList.add("CloseBack")
        setTimeout(() => {
            document.getElementById(idBack.current).style.display = "none"
            document.getElementById(idBack.current).classList.remove("CloseBack")
            document.getElementById(idChild.current).style.position = ""
        }, 300)
    }

    const closeCont = () => {
        document.getElementById(idCont.current).classList.remove("OpenBack")
        document.getElementById(idCont.current).classList.add("CloseBack")
        setTimeout(() => {
            document.getElementById(idCont.current).style.display = "none"
            document.getElementById(idCont.current).classList.remove("CloseBack")
        }, 300)
    }

    const openMainProc = () => {
        console.log('openMainProc')
        openBack()
        openCont()
    }

    const closeMainProc = () => {
        console.log('openMainProc')
        closeBack()
        closeCont()
    }

    const onMouseEnterChild = () => {
        console.log('onMouseEnterChild')
        fakePosRef.current = true
        setTimeout(() => fakePosRef.current && openMainProc(), 200)
    }

    const onMouseLeaveChild = () => {
        console.log('onMouseLeaveChild')
        fakePosRef.current = false
        closeMainProc()
    }

    return (
        <div className="ModalHoverMainDiv">
            <div className="ModalHoverBack"
            id={idBack.current = 'Back-' + Math.floor(Math.random() * 1000)}
            >

            </div>
            <div className="ModalHoverChild"
                onMouseEnter={() => onMouseEnterChild()}
                onMouseLeave={() => onMouseLeaveChild()}
                id={idChild.current = 'Child-' + Math.floor(Math.random() * 1000)}
            >
                {props.children}
            </div>
            <div className="ModalHoverCont"
                id={idCont.current = 'Cont-' + Math.floor(Math.random() * 1000)}            
            >
                <ModalHoverContent content={props.onHover}/>
            </div>
        </div>
    )
}

export default ModelHover