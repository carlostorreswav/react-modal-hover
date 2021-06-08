import { useEffect } from 'react'
import React from 'react'
import './ModalHover.css'

const ModalHover = (props) => {

    //legendPos setting

    const prevLegendPos = props.legendPos === "right" || !props.legendPos ? "right" : props.legendPos === "left" ? "left" : "right"

    // propsDic is the main dictionary where merges the user props and the default package settings

    const propsDic = {
        // General props
        General: {
            active:     props.active === false ? false : true,
            legend:     props.legend === false ? false : true,
            legendMsg:  props.legendMsg ? props.legendMsg : "?",
            legendPos:  prevLegendPos,
        },
        // BackgroundStyles
        BackgroundStyles:{
            display: "none",
            position: "fixed",
            zIndex: "999999997",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: props.BackgroundStyles && props.BackgroundStyles.backgroundColor ? props.BackgroundStyles.backgroundColor : "rgba(0, 0, 0, 0.75)"
        },
        // ContentStyles
        ContentStyles:{
            display:            "none",
            position:           "absolute",
            zIndex:             "999999998",
            wordWrap:           "break-word",
            backgroundColor:    props.ContentStyles && props.ContentStyles.backgroundColor ?  props.ContentStyles.backgroundColor    : "rgba(0, 0, 0, 1)",
            maxWidth:           props.ContentStyles && props.ContentStyles.maxWidth ?         props.ContentStyles.maxWidth           : "100%",
            marginLeft:           props.ContentStyles && props.ContentStyles.marginLeft ?         props.ContentStyles.marginLeft           : "20px",
            marginRight:           props.ContentStyles && props.ContentStyles.marginRight ?         props.ContentStyles.marginRight           : "20px",
            borderRadius:       props.ContentStyles && props.ContentStyles.borderRadius ?     props.ContentStyles.borderRadius       : "8px",
            boxShadow:          props.ContentStyles && props.ContentStyles.boxShadow ?        props.ContentStyles.boxShadow          : "0 0 10px 0 black",
            color:              props.ContentStyles && props.ContentStyles.color ?            props.ContentStyles.color              : "white",
            padding:            props.ContentStyles && props.ContentStyles.padding ?          props.ContentStyles.padding            : "10px 20px",
            border:             props.ContentStyles && props.ContentStyles.border ?           props.ContentStyles.border             : "2px solid orange",
        },
        // LeyendStyles
        LegendStyles: {
            position:           "absolute",
            top:                "0",
            right:              prevLegendPos === 'right' && '0',
            left:               prevLegendPos === 'left' && '0',
            marginTop:          props.LegendStyles && props.LegendStyles.marginTop ?        props.LegendStyles.marginTop        : "0px",
            marginLeft:         props.LegendStyles && props.LegendStyles.marginLeft ?      props.LegendStyles.marginLeft      : "0px",
            color:              props.LegendStyles && props.LegendStyles.color ?            props.LegendStyles.color            : "white",
            backgroundColor:    props.LegendStyles && props.LegendStyles.backgroundColor ?  props.LegendStyles.backgroundColor  : "orange",
            borderRadius:       props.LegendStyles && props.LegendStyles.borderRadius ?     props.LegendStyles.borderRadius     : "50px",
            minHeight:          props.LegendStyles && props.LegendStyles.minHeight ?        props.LegendStyles.minHeight        : "20px",
            minWidth:           props.LegendStyles && props.LegendStyles.minWidth ?         props.LegendStyles.minWidth         : "20px",
            padding:            props.LegendStyles && props.LegendStyles.padding ?          props.LegendStyles.padding          : "2px 2px",
            display:            props.LegendStyles && props.LegendStyles.display ?          props.LegendStyles.display          : "flex",
            justifyContent:     props.LegendStyles && props.LegendStyles.justifyContent ?   props.LegendStyles.justifyContent   : "space-around",
            alignItems:         props.LegendStyles && props.LegendStyles.alignItems ?       props.LegendStyles.alignItems       : "center",
            cursor:             props.LegendStyles && props.LegendStyles.cursor ?           props.LegendStyles.cursor           : "pointer",
            boxShadow:          props.LegendStyles && props.LegendStyles.boxShadow ?        props.LegendStyles.boxShadow        : "0 0 5px 0 black",
            fontSize:           props.LegendStyles && props.LegendStyles.fontSize ?         props.LegendStyles.fontSize         : "16px",
            fontWeight:         props.LegendStyles && props.LegendStyles.fontWeight ?       props.LegendStyles.fontWeight       : "bold",
        },
        //Fades
        Fades: {
            backFadeIn: props.Fades && props.Fades.backFadeIn ? props.Fades.backFadeIn : "1s ease",
            backFadeOut: props.Fades && props.Fades.backFadeOut ? props.Fades.backFadeOut : ".3s ease",
            contFadeIn: props.Fades && props.Fades.contFadeIn ? props.Fades.contFadeIn : "1s ease",
            contFadeOut: props.Fades && props.Fades.contFadeOut ? props.Fades.contFadeOut : ".3s ease",
        },

        // Other default settings...
        MainDivStyles : {
            visibility: "hidden",
            margin:"0 auto"
        },
        ChildStyles: {
            visibility: "hidden",
            zIndex: "999999999",
        }
    }

    // REFS
    const childRef = React.useRef({})
    const contRef = React.useRef({})

    const idBack = React.useRef({})
    const idChild = React.useRef({})
    const idCont = React.useRef({})
    const idMain = React.useRef({})
    const idLegend = React.useRef({})
    const idDynChild = React.useRef({})

    //OPEN AND CLOSE PROCEDURES
    const openBack = () => {
        document.getElementById(idMain.current).style.visibility = "visible"
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

    // Calculating position of the Children
    const calcPos = () => {
        // const childDiv = document.getElementById(idChild.current).firstChild
        const childDiv = document.querySelector(`[idDynChild=${idDynChild.current}]`)
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

        if (childData.y + childData.height >= heightBreak) {
            contPos = {...contPos, hUp: false}
        }

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

        if (contData.width >= window.innerWidth / 2) {
            contPos = {...contPos, isBig: true}
        }

        props.logs === true && console.table(contPos)
        adjustLegend(childData)
        moveProc(contPos, childData, contData, contDiv)

    }

    const adjustLegend = (childData) => {
        if (props.legend !== false) {
            const LegendDiv = document.getElementById(idLegend.current)
            const LegendData = LegendDiv.getBoundingClientRect()
            let newX = 0
            let newY = 0
            const prevMarginTop = Number(propsDic.LegendStyles.marginTop.replace(/px$/, ''))
            const prevMarginLeft = Number(propsDic.LegendStyles.marginLeft.replace(/px$/, ''))
            let newChildH = 0
            console.log('asd', document.getElementById(idChild.current).firstChild)
                newChildH = childData.height
            newY = - (LegendData.height / 2) + prevMarginTop - (newChildH)
            newX = - (LegendData.width / 2 + prevMarginLeft)
            LegendDiv.style.margin = `${newY}px ${newX}px`
        }
    }

    // Moving the content aside the children
    const moveProc = (contPos, childData, contData, contDiv) => {
        let newPosY = 0
        if (contPos.hUp === false) {
            let newLegHeight = 0
            if (props.legend !== false) {
                newLegHeight = document.getElementById(idLegend.current).getBoundingClientRect().height
            }
            newPosY = - (contData.height + childData.height + newLegHeight )
        }
        contDiv.style.transform = `translate(${moveX(childData, contData, contPos)}px, ${newPosY }px)`
    }

    const moveX = (childData, contData, contPos) => {
        //HARDEST PROCEDURE ON DEV 👨‍💻
        let newPos = 0
            if (contPos.wCenter && !contPos.isBig) {
            const childMidPoint = childData.left + (childData.width / 2)
            const contMidPoint = contData.left + (contData.width / 2)
            newPos = - (contMidPoint - childMidPoint)
            }
        return newPos
    }

    // Both components cannot be hovered to close the modal
    const checkClose = () => {
        setTimeout(() => {
            if (childRef.current !== true && contRef.current !== true) {
                closeBack()
                closeCont()
            }
        }, 100)
    }

    const createLegend = async () => {
        return new Promise((res, rej) => {

                let MetaLegDiv = document.createElement('div')
                MetaLegDiv.style.position = "relative"
                const LegDiv = document.createElement('div')
                LegDiv.innerText = propsDic.General.legendMsg
                LegDiv.id = idLegend.current = 'Legend-' + Math.floor(Math.random() * 10000)
                Object.entries(propsDic.LegendStyles).forEach((elm) => {
                    LegDiv.style[elm[0]] = elm[1]
                })
                if (props.legend === false) {
                    LegDiv.style.visibility = "hidden"
                }

                // document.getElementById(idChild.current).appendChild(MetaLegDiv)    
                // document.getElementById(idChild.current).parentNode.insertBefore(MetaLegDiv, document.getElementById(idChild.current))
    
                // Get the parent element
                    let parentElement = document.getElementById(idChild.current)
                    // Get the parent's first child
                    let theFirstChild = parentElement.firstChild

                    // let childClone = theFirstChild.cloneNode(true)
                    // childClone.style.visibility = "visible"
                    // childClone.style.position = "relative"
                    // childClone.appendChild(LegDiv)

                    MetaLegDiv.appendChild(LegDiv)
    
                    //idDynChild
                    theFirstChild.setAttribute('idDynChild', idDynChild.current = 'idDynChild-' + Math.floor(Math.random() * 10000) )
    
                    // Create a new element
                    let newElement = MetaLegDiv


                    console.log('theFirstChild', theFirstChild.nodeName)

                    const hArray = ["H1","H2","H3","H4","H5","H6"]
                    if (hArray.includes(theFirstChild.nodeName)){
                        theFirstChild.appendChild(newElement)
                    } else {
                        theFirstChild.appendChild(newElement)
                    // parentElement.insertBefore(newElement, theFirstChild)

                    }
    
                    // Insert the new element before the first child
                    //ESTO VA BIEN EN IMAGENES Y EN DIVS PERO MAL EN HS
                    // parentElement.insertBefore(newElement, theFirstChild)

                    //ESTO VA BIEN EN HS PERO MAL EN DIVS
                    // theFirstChild.appendChild(newElement)
                    res(true)
        })

    }

    const startProc = async () => {
        const res = await createLegend()
        if (res===true) {calcPos()}
    }


    // caclPos on start to avoid errors
    useEffect(() => {
        if (propsDic.General.active === true) {
            if (props.children && props.children.$$typeof === Symbol.for('react.element')) {
                startProc()
            } else {
                console.error('react-modal-hover needs a children and is empty')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.LegendStyles, props.ContentStyles, props.BackgroundStyles])


    return (
        propsDic.General.active === true ?
            <div className="ModalHoverMainDiv" style={propsDic.MainDivStyles}
            id={idMain.current = 'Main-' + Math.floor(Math.random() * 10000)}
            >
                <div className="ModalHoverBack" style={propsDic.BackgroundStyles}
                id={idBack.current = 'Back-' + Math.floor(Math.random() * 10000)}
                >

                </div>
                <div className="ModalHoverChild" style={propsDic.ChildStyles}
                    onMouseEnter={() => {
                        childRef.current = true
                        setTimeout(() => {childRef.current === true &&
                            calcPos()
                            openBack()
                            openCont()
                        }, 200)}}
                    onMouseLeave={() => {childRef.current = false; checkClose()}}
                    id={idChild.current = 'Child-' + Math.floor(Math.random() * 10000)}
                >
                    {props.children}
                </div>
                <div className="ModalHoverCont" style={propsDic.ContentStyles}
                    id={idCont.current = 'Cont-' + Math.floor(Math.random() * 10000)}
                    onMouseEnter={() => contRef.current = true}
                    onMouseLeave={() => {contRef.current = false; checkClose()}}
                >
                    {props.onHover}
                </div>
            </div>

            :
            <>{props.children}</>

    )
}

export default ModalHover