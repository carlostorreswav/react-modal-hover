import { useEffect } from 'react'
import React from 'react'
import './ModalHover.css'

const ModalHover = (props) => {

    const propsDic = {
        BackStyles:{
            backgroundColor: props.BackStyles && props.BackStyles.backgroundColor ? props.BackStyles.backgroundColor : "rgba(0, 0, 0, 0.75)"
        },
        ContStyles:{
            backgroundColor: props.ContStyles && props.ContStyles.backgroundColor ? props.ContStyles.backgroundColor : "rgba(0, 0, 0, 1)",
            maxWidth: props.ContStyles && props.ContStyles.maxWidth ? props.ContStyles.maxWidth : "100%",
            borderRadius: props.ContStyles && props.ContStyles.borderRadius ? props.ContStyles.borderRadius : "8px",
            boxShadow: props.ContStyles && props.ContStyles.boxShadow ? props.ContStyles.boxShadow : "0 0 10px 2px black",
            color: props.ContStyles && props.ContStyles.color ? props.ContStyles.color : "white",
            padding: props.ContStyles && props.ContStyles.padding ? props.ContStyles.padding : "10px 20px",
            border: props.ContStyles && props.ContStyles.border ? props.ContStyles.border : "2px solid orange",
        },
        Fades: {
            backFadeIn: props.Fades && props.Fades.backFadeIn ? props.Fades.backFadeIn : "1s ease",
            backFadeOut: props.Fades && props.Fades.backFadeOut ? props.Fades.backFadeOut : ".3s ease",
            contFadeIn: props.Fades && props.Fades.contFadeIn ? props.Fades.contFadeIn : "1s ease",
            contFadeOut: props.Fades && props.Fades.contFadeOut ? props.Fades.contFadeOut : ".3s ease",
        },
        LegendStyles: {
            color: props.LegendStyles && props.LegendStyles.color ? props.LegendStyles.color : "white",
            backgroundColor:    props.LegendStyles && props.LegendStyles.backgroundColor ? props.LegendStyles.backgroundColor :"orange",
            borderRadius:       props.LegendStyles && props.LegendStyles.borderRadius ? props.LegendStyles.borderRadius :"50px",
            minHeight:          props.LegendStyles && props.LegendStyles.minHeight ? props.LegendStyles.minHeight :"20px",
            minWidth:           props.LegendStyles && props.LegendStyles.minWidth ? props.LegendStyles.minWidth :"20px",
            padding:            props.LegendStyles && props.LegendStyles.padding ? props.LegendStyles.padding :"2px 2px",
            display:            props.LegendStyles && props.LegendStyles.display ? props.LegendStyles.display :"flex",
            justifyContent:     props.LegendStyles && props.LegendStyles.justifyContent ? props.LegendStyles.justifyContent :"space-around",
            alignItems:         props.LegendStyles && props.LegendStyles.alignItems ? props.LegendStyles.alignItems :"center",
            cursor:             props.LegendStyles && props.LegendStyles.cursor ? props.LegendStyles.cursor :"pointer",
            boxShadow:          props.LegendStyles && props.LegendStyles.boxShadow ? props.LegendStyles.boxShadow :"0 0 5px 0 black",
            fontSize:           props.LegendStyles && props.LegendStyles.fontSize ? props.LegendStyles.fontSize :"16px",
            fontWeight:         props.LegendStyles && props.LegendStyles.fontWeight ? props.LegendStyles.fontWeight :"bold",
        },
        General: {
            active: props.active === false ? false : true,
            legend: props.legend === false ? false : true,
            legendMsg: props.legendMsg ? props.legendMsg : "?",
            legendPos: props.legendPos ? props.legendPos: "right",
        }
    }

    //STYLES 
    let ModalHoverMainDivStyles = {
        visibility: "hidden",
        // width:"fit-content",
        margin:"0 auto"
    }

    let ModalHoverChildStyles = {
        visibility: "hidden",
        zIndex: "999999999",
    }

    let ModalHoverBackStyles = {
        display: "none",
        position: "fixed",
        zIndex: "999999997",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: propsDic.BackStyles.backgroundColor,
    }

    let ModalHoverContStyles = {
        display: "none",
        position: "absolute",
        zIndex: "999999998",
        wordWrap: "break-word",
        maxWidth: propsDic.ContStyles.maxWidth,
        backgroundColor: propsDic.ContStyles.backgroundColor,
        borderRadius: propsDic.ContStyles.borderRadius,
        boxShadow: propsDic.ContStyles.boxShadow,
        color: propsDic.ContStyles.color,
        padding: propsDic.ContStyles.padding,
        border: propsDic.ContStyles.border
    }

    let ModalHoverLegendStyles = {
        position: "absolute",
        top: "0",
        right: (propsDic.General.legendPos === 'right' && '0'),
        left: (propsDic.General.legendPos === 'left' && '0'),
        backgroundColor:        propsDic.LegendStyles.backgroundColor,
        borderRadius:           propsDic.LegendStyles.borderRadius,
        minHeight:              propsDic.LegendStyles.minHeight,
        minWidth:               propsDic.LegendStyles.minWidth,
        padding:                propsDic.LegendStyles.padding,
        display:                propsDic.LegendStyles.display,
        justifyContent:         propsDic.LegendStyles.justifyContent,
        alignItems:             propsDic.LegendStyles.alignItems,
        cursor:                 propsDic.LegendStyles.cursor,
        boxShadow:              propsDic.LegendStyles.boxShadow,
        fontSize:               propsDic.LegendStyles.fontSize,
        fontWeight:             propsDic.LegendStyles.fontWeight,
        color: propsDic.LegendStyles.color
    }

    // REFS
    const childRef = React.useRef({})
    const contRef = React.useRef({})

    const idBack = React.useRef({})
    const idChild = React.useRef({})
    const idCont = React.useRef({})
    const idMain = React.useRef({})

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
            if (childRef.current !== true && contRef.current !== true) {
                document.getElementById(idBack.current).style.display = "none"
                document.getElementById(idBack.current).style.animation = ""
                document.getElementById(idChild.current).style.position = ""
            }
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
        contDiv.style.transform = `translate(0px, 0px)`
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
        if (childData.y + childData.height >= heightBreak) {
            contPos = {...contPos, hUp: false}
        } 

        // SETTING X POSITION
        if (childData.x + childData.width >= widthBreakL && childData.x + childData.width <= widthBreakR) {
            contPos = {...contPos, wCenter: true}
        } 
        
        if (childData.x + childData.width <= widthBreakL) {
            contPos = {...contPos, wLeft: true}
            if (!props.legendPos){propsDic.General.legendPos = "left"}
        }

        if (childData.x + childData.width >= widthBreakR) {
            if (!props.legendPos){propsDic.General.legendPos = "right"}
            contPos = {...contPos, wRight: true}
        }

        if (contData.width >= window.innerWidth / 2 || childData.x + childData.width >= window.innerWidth / 2) {
            contPos = {...contPos, isBig: true}
        }

        moveProc(contPos, childData, contData, contDiv)

    }

    // Moving the content aside the children
    const moveProc = (contPos, childData, contData, contDiv) => {
        let newPosX = 0
        let newPosY = 0

        console.log('childData',childData)
        console.log('contData',contData)
        console.log('window.innerWidth',window.innerWidth)

        // // Content Down? move it up
        if (contPos.hUp === false) {
            newPosY = - (contData.height + childData.height + (contData.top - childData.top))
        }

        // onDev 👨‍💻
        if (process.env.NODE_ENV === 'development') {
            console.table(contPos)
            console.table({newPosX: newPosX, newPosY: newPosY})
        }

        contDiv.style.transform = `translate(${newPosX}px, ${newPosY}px)`

        contDiv.style.transform = `translate(${moveRatio(childData, contData)}px, ${newPosY}px)`
    }

    const moveRatio = (childData, contData) => {
        console.log('moveRatio: childData',childData,'contData',contData)
        let newPos = 0
            if ((contData.right - childData.right) / 2 >= contData.left) {
                newPos = - contData.left + 10
            } else {
                newPos = - ((contData.right - childData.right) / 2)
            }
        console.log('returning', newPos)
        return newPos
    }

    const openMain = () => {
        document.getElementById(idMain.current).style.visibility = "visible"
    }

    // OPEN AND CLOSE MAIN PROCEDURES 🚀
    const openMainProc = () => {
        calcPos()
        openMain()
        openBack()
        openCont()
    }

    const closeMainProc = () => {
        closeBack()
        closeCont()
    }

    // Both components cannot be hovered to close the modal
    const checkClose = () => {
        console.log('checkClose!')
        setTimeout(() => {
            if (childRef.current !== true && contRef.current !== true) {
                closeMainProc()
            }
        }, 100)
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
        if (propsDic.General.active === true) {
            calcPos()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        propsDic.General.active === true ? 
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
                    <div style={{position:"relative"}}>
                    {propsDic.General.legend === true && <div style={ModalHoverLegendStyles}>{propsDic.General.legendMsg}</div>}
                    </div>
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
            
            :
            <>{props.children}</>

    )
}

export default ModalHover