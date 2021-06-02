import { useEffect, useRef } from 'react'
import ModalHoverContent from '../ModalHoverContent/ModalHoverContent'
import './ModalHover.css'

const ModelHover = (props) => {

    const childRef = useRef({})
    const contRef = useRef({})

    const idBack = useRef({})
    const idChild = useRef({})
    const idCont = useRef({})
    const idMain = useRef({})

    const openBack = () => {
        document.getElementById(idChild.current).style.position = "relative"
        setTimeout(() => {
            document.getElementById(idBack.current).style.display = "block"
            document.getElementById(idBack.current).classList.add("OpenBack")
        }, 25)
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
            document.getElementById(idMain.current).style.visibility = "hidden"
        }, 300)
    }

    const calcPos = () => {
        const childDiv = document.getElementById(idChild.current).firstChild
        const contDiv = document.getElementById(idCont.current)
        const childData = childDiv.getBoundingClientRect()
        contDiv.style.display = "block"
        const contData = document.getElementById(idCont.current).getBoundingClientRect()
        contDiv.style.display = "none"

        const heightBreak = window.innerHeight / 2
        const widthBreakL = window.innerWidth / 3
        const widthBreakR = widthBreakL * 2

        let contPos = {hUp:false, hDw: false, wLeft: false, wCenter: false, wRight:false, isBig:false}

        if (childData.y + childData.height >= (heightBreak / 2)) {
            contPos = {...contPos, hDw: true}
        } else {
            contPos = {...contPos, hUp: true}
        }

        if (childData.x + childData.width >= widthBreakL && childData.x + childData.width <= widthBreakR) {
            contPos = {...contPos, wCenter: true}
        } else if (childData.x + childData.width <= widthBreakL) {
            contPos = {...contPos, wLeft: true}
        } else if (childData.x + childData.width >= widthBreakR) {
            contPos = {...contPos, wRight: true}
        }

        if (contData.width >= window.innerWidth / 2) {
            contPos = {...contPos, isBig: true}
        }

        moveProc(contPos, childData, contData, contDiv)

    }

    const moveProc = (contPos, childData, contData, contDiv) => {
        let newPosX = 0
        let newPosY = 0
        if (contPos.hDw) {
            newPosY = - (contData.height + childData.height)
        }
        if (contPos.wLeft && !contPos.isBig) {
            newPosX = (childData.left + childData.width)
        }

        if (contPos.wCenter) {
            const childCenter  = (childData.left + (childData.width / 2))
            const contCenter = ((contData.width / 2))
            newPosX = childCenter - contCenter
        }

        if (contPos.wRight) {
            newPosX = childData.left - contData.width
        }

        if (contPos.isBig) {
            newPosX = ((window.innerWidth - contData.width) / 2)
        }
        contDiv.style.transform = `translate(${newPosX}px, ${newPosY}px)`
    }

    const openMain = () => {
        document.getElementById(idMain.current).style.visibility = "visible"
    }


    const openMainProc = () => {
        openMain()
        calcPos()
        openBack()
        openCont()
    }

    const closeMainProc = () => {
        closeBack()
        closeCont()
    }

    const checkClose = () => {
        setTimeout(() => {
            if (childRef.current !== true && contRef.current !== true) {
                closeMainProc()
            }
        }, 250)
    }

    const onMouseEnterChild = () => {
        childRef.current = true
        setTimeout(() => childRef.current === true && openMainProc(), 200)
    }

    const onMouseLeaveChild = () => {
        childRef.current = false
        checkClose()
    }

    const onMouseEnterCont = () => {
        contRef.current = true
    }

    const onMouseLeaveCont = () => {
        contRef.current = false
        checkClose()
    }

    useEffect(() => {
        calcPos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="ModalHoverMainDiv"
        id={idMain.current = 'Main-' + Math.floor(Math.random() * 10000)}
        >
            <div className="ModalHoverBack"
            id={idBack.current = 'Back-' + Math.floor(Math.random() * 10000)}
            >

            </div>
            <div className="ModalHoverChild"
                onMouseEnter={() => onMouseEnterChild()}
                onMouseLeave={() => onMouseLeaveChild()}
                id={idChild.current = 'Child-' + Math.floor(Math.random() * 10000)}
            >
                {props.children}
            </div>
            <div className="ModalHoverCont"
                id={idCont.current = 'Cont-' + Math.floor(Math.random() * 10000)}  
                onMouseEnter={() => onMouseEnterCont()}
                onMouseLeave={() => onMouseLeaveCont()}          
            >
                <ModalHoverContent content={props.onHover} open={childRef.current}/>
            </div>
        </div>
    )
}

export default ModelHover