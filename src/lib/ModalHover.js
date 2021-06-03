import { useRef, useEffect } from 'react'
import React from 'react'
import './ModalHover.css'

const ModelHover = (props) => {

    const propsDic = {
        BackStyles:{
            backgroundColor: props.BackStyles && props.BackStyles.backgroundColor ? props.BackStyles.backgroundColor : "rgba(0, 0, 0, 0.25)"
        },
        ContStyles:{
            backgroundColor: props.ContStyles && props.ContStyles.backgroundColor ? props.ContStyles.backgroundColor : "rgba(0, 0, 0, 0.75)",
            maxWidth: props.ContStyles && props.ContStyles.maxWidth ? props.ContStyles.maxWidth : "90%",
            borderRadius: props.ContStyles && props.ContStyles.borderRadius ? props.ContStyles.borderRadius : "8px",
            boxShadow: props.ContStyles && props.ContStyles.boxShadow ? props.ContStyles.boxShadow : "0 0 10px 0 black",
            color: props.ContStyles && props.ContStyles.color ? props.ContStyles.color : "white",
            padding: props.ContStyles && props.ContStyles.padding ? props.ContStyles.padding : "10px 20px",
        },
        Fades: {
            backFadeIn: props.Fades && props.Fades.backFadeIn ? props.Fades.backFadeIn : "1s ease",
            backFadeOut: props.Fades && props.Fades.backFadeOut ? props.Fades.backFadeOut : ".3s ease",
            contFadeIn: props.Fades && props.Fades.contFadeIn ? props.Fades.contFadeIn : "1s ease",
            contFadeOut: props.Fades && props.Fades.contFadeOut ? props.Fades.contFadeOut : ".3s ease",
        }
    }

    //STYLES 
    let ModalHoverMainDivStyles = {
        visibility: "hidden"
    }

    let ModalHoverChildStyles = {
        visibility: "hidden"
    }

    let ModalHoverBackStyles = {
        display: "none",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: propsDic.BackStyles.backgroundColor,
    }

    let ModalHoverContStyles = {
        display: "none",
        position: "absolute",
        wordWrap: "break-word",
        maxWidth: propsDic.ContStyles.maxWidth,
        backgroundColor: propsDic.ContStyles.backgroundColor,
        borderRadius: propsDic.ContStyles.borderRadius,
        boxShadow: propsDic.ContStyles.boxShadow,
        color: propsDic.ContStyles.color,
        padding: propsDic.ContStyles.padding,
    }

    // REFS
    const childRef = useRef({})
    const contRef = useRef({})

    const idBack = useRef({})
    const idChild = useRef({})
    const idCont = useRef({})
    const idMain = useRef({})

    // OPEN AND CLOSING PROCEDURES 📂
    const openBack = () => {
        document.getElementById(idChild.current).style.position = "relative"
        setTimeout(() => {
            document.getElementById(idBack.current).style.display = "block"
            document.getElementById(idBack.current).style.animation = `AniOpaOpen ${propsDic.Fades.backFadeIn}`
        }, 25)
    }

    const openCont = () => {
        document.getElementById(idCont.current).style.display = "block"
        document.getElementById(idCont.current).style.animation = `AniOpaOpen ${propsDic.Fades.contFadeIn}`
    }

    const closeBack = () => {
        document.getElementById(idBack.current).style.animation = `AniOpaClose ${propsDic.Fades.backFadeOut} forwards`
        setTimeout(() => {
            document.getElementById(idBack.current).style.display = "none"
            document.getElementById(idBack.current).style.animation = ""
            document.getElementById(idChild.current).style.position = ""
        }, 300)
    }

    const closeCont = () => {
        document.getElementById(idCont.current).style.animation = `AniOpaClose ${propsDic.Fades.backFadeOut} forwards`
        setTimeout(() => {
            document.getElementById(idCont.current).style.display = "none"
            document.getElementById(idCont.current).style.animation = ""
            document.getElementById(idMain.current).style.visibility = "hidden"
        }, 300)
    }
    // OPEN AND CLOSING PROCEDURES 📂

    // Calculating position of the Children 
    const calcPos = () => {
        const childDiv = document.getElementById(idChild.current).firstChild
        const contDiv = document.getElementById(idCont.current)
        const childData = childDiv.getBoundingClientRect()

        //We open for an instant the component to measeure its position
        contDiv.style.display = "block"
        const contData = document.getElementById(idCont.current).getBoundingClientRect()
        contDiv.style.display = "none"

        const heightBreak = window.innerHeight / 2
        const widthBreakL = window.innerWidth / 3
        const widthBreakR = widthBreakL * 2

        let contPos = {hUp:true, wLeft: false, wCenter: false, wRight:false, isBig:false}

        // SETTING UP OR DOWN
        console.log('childData.y',childData.y,'childData.height',childData.height,'(heightBreak / 2)',(heightBreak / 2))
        if (childData.y + childData.height >= heightBreak) {
            contPos = {...contPos, hUp: false}
        } 

        // SETTING X POSITION
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

    // Moving the content aside the children
    const moveProc = (contPos, childData, contData, contDiv) => {
        let newPosX = 0
        let newPosY = 0
        // Content Down? move it up
        if (contPos.hUp === false) {
            newPosY = - (contData.height + childData.height)
        }
        // Content Left and NOT big? move it to right 
        if (contPos.wLeft && !contPos.isBig) {
            newPosX = (childData.left + childData.width)
        }
        // Content centered and NOT big? move it up to its position
        if (contPos.wCenter && !contPos.isBig) {
            const childCenter  = (childData.left + (childData.width / 2))
            const contCenter = ((contData.width / 2))
            newPosX = childCenter - contCenter
        }
        // Content Right? Move it to left
        if (contPos.wRight && !contPos.isBig) {
            newPosX = childData.left - contData.width
        }
        // Content is big? complete screen
        if (contPos.isBig) {
            newPosX = ((window.innerWidth - contData.width) / 2)
        }

        // onDev 👨‍💻
        if (process.env.NODE_ENV === 'development') {
            console.log('%c ====> MOVEPROC <====', 'background: #333; color: #fff');
            console.table(contPos)
            console.table({newPosX: newPosX, newPosY: newPosY})
        }

        contDiv.style.transform = `translate(${newPosX}px, ${newPosY}px)`
    }

    const openMain = () => {
        document.getElementById(idMain.current).style.visibility = "visible"
    }

    // OPEN AND CLOSE MAIN PROCEDURES 🚀
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

    // Both components cannot be hovered to close the modal
    const checkClose = () => {
        setTimeout(() => {
            if (childRef.current !== true && contRef.current !== true) {
                closeMainProc()
            }
        }, 250)
    }

    // Mouse enter / Mouse Leave 🖱️
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

    // caclPos on start to avoid errors
    useEffect(() => {
        calcPos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="ModalHoverMainDiv" style={ModalHoverMainDivStyles}
        id={idMain.current = 'Main-' + Math.floor(Math.random() * 10000)}
        >
            <div className="ModalHoverBack" style={ModalHoverBackStyles}
            id={idBack.current = 'Back-' + Math.floor(Math.random() * 10000)}
            >

            </div>
            <div className="ModalHoverChild" style={ModalHoverChildStyles}
                onMouseEnter={() => onMouseEnterChild()}
                onMouseLeave={() => onMouseLeaveChild()}
                id={idChild.current = 'Child-' + Math.floor(Math.random() * 10000)}
            >

                {props.children}

            </div>
            <div className="ModalHoverCont" style={ModalHoverContStyles}
                id={idCont.current = 'Cont-' + Math.floor(Math.random() * 10000)}  
                onMouseEnter={() => onMouseEnterCont()}
                onMouseLeave={() => onMouseLeaveCont()}          
            >
                {props.onHover}
            </div>
        </div>
    )
}

export default ModelHover