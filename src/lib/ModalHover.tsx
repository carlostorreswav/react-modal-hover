import React, { useEffect, useRef } from 'react';

import {
  ContentPosition,
  ModalHoverProps,
  MoveProcAction,
  MoveRatioAction,
} from './interfaces';
import {
  _ModalHoverBackStyles,
  _ModalHoverContStyles,
  _ModalHoverLegendStyles,
  _propsDic,
  ModalHoverChildStyles,
  ModalHoverMainDivStyles,
} from './custom-props';

import './styles.css';

export function ModalHover(props: ModalHoverProps): JSX.Element {
  // Styles
  const propsDic = _propsDic(props);
  const ModalHoverBackStyles = _ModalHoverBackStyles(propsDic);
  const ModalHoverContStyles = _ModalHoverContStyles(propsDic);
  const ModalHoverLegendStyles = _ModalHoverLegendStyles(propsDic);

  // References
  const childRef = useRef({});
  const contRef = useRef({});

  const idBack = useRef({});
  const idChild = useRef({});
  const idCont = useRef({});
  const idMain = useRef({});

  const openBack: () => void = (): void => {
    const $idChild: HTMLElement | null = document.getElementById(idChild.current as string);

    if ($idChild) {
      $idChild.style.position = 'relative';

      setTimeout((): void => {
        const $idBack: HTMLElement | null = document.getElementById(idBack.current as string);

        if ($idBack) {
          $idBack.style.display = 'block';
          $idBack.style.animation = `AniOpaOpen ${propsDic.Fades.backFadeIn}`;
        }
      }, 25);
    }
  };
  const openCont: () => void = (): void => {
    const $idCont: HTMLElement | null = document.getElementById(idCont.current as string);

    if ($idCont) {
      $idCont.style.display = 'block';
      $idCont.style.animation = `AniOpaOpen ${propsDic.Fades.contFadeIn}`;
    }
  };
  const closeBack: () => void = (): void => {
    const $idBack: HTMLElement | null = document.getElementById(idBack.current as string);

    if ($idBack) {
      $idBack.style.animation = `AniOpaClose ${propsDic.Fades.backFadeOut} forwards`;

      setTimeout((): void => {
        if (childRef.current !== true && contRef.current !== true) {
          const $idChild: HTMLElement | null = document.getElementById(idChild.current as string);

          $idBack.style.display = 'none';
          $idBack.style.animation = '';

          if ($idChild) {
            $idChild.style.position = '';
          }
        }
      }, 300);
    }
  };
  const closeCont: () => void = (): void => {
    const $idCont: HTMLElement | null = document.getElementById(idCont.current as string);

    if ($idCont) {
      $idCont.style.animation = `AniOpaClose ${propsDic.Fades.backFadeOut} forwards`;

      setTimeout((): void => {
        const $idMain: HTMLElement | null = document.getElementById(idMain.current as string);

        $idCont.style.display = 'none';
        $idCont.style.animation = '';

        if ($idMain) {
          $idMain.style.visibility = 'hidden';
        }
      }, 300);
    }
  };

  // Calculating position of the Children
  const calcPos: () => void = (): void => {
    const $idChild: HTMLElement | null = document.getElementById(idChild.current as string);
    const $idCont: HTMLElement | null = document.getElementById(idCont.current as string);

    if (!$idChild && !$idCont) {
      return;
    }

    const childDiv: ChildNode | null = ($idChild as HTMLElement).firstChild;

    if (!childDiv) {
      return;
    }

    const contDiv: HTMLElement = $idCont as HTMLElement;

    contDiv.style.transform = 'translate(0px, 0px)';

    const childData: DOMRect = (childDiv as HTMLElement).getBoundingClientRect();

    //We open for an instant the component to measeure its position
    contDiv.style.display = 'block';

    const contData: DOMRect = ($idCont as HTMLElement).getBoundingClientRect();

    contDiv.style.display = 'none';

    const heightBreak: number = window.innerHeight / 2;
    const widthBreakL: number = window.innerWidth / 3;
    const widthBreakR: number = widthBreakL * 2;

    let contPos: ContentPosition = {
      hUp: true,
      wLeft: false,
      wCenter: false,
      wRight: false,
      isBig: false,
    };

    if (childData.y + childData.height >= heightBreak) {
      contPos = { ...contPos, hUp: false };
    }

    if (childData.x + childData.width >= widthBreakL && childData.x + childData.width <= widthBreakR) {
      contPos = { ...contPos, wCenter: true };
    }

    if (childData.x + childData.width <= widthBreakL) {
      contPos = { ...contPos, wLeft: true };

      if (!props.legendPos) {
        propsDic.General.legendPos = 'left';
      }
    }

    if (childData.x + childData.width >= widthBreakR) {
      if (!props.legendPos) {
        propsDic.General.legendPos = 'right';
      }

      contPos = { ...contPos, wRight: true };
    }

    if (contData.width >= window.innerWidth / 2 || childData.x + childData.width >= window.innerWidth / 2) {
      contPos = { ...contPos, isBig: true };
    }

    moveProc(contPos, childData, contData, contDiv);
  };

  // Moving the content aside the children
  const moveProc: MoveProcAction = (
    contPos: ContentPosition,
    childData: DOMRect,
    contData: DOMRect,
    contDiv: HTMLElement,
  ): void => {
    let newPosX: number = 0;
    let newPosY: number = 0;

    // console.log('childData', childData)
    // console.log('contData', contData)
    // console.log('window.innerWidth', window.innerWidth)

    // // Content Down? move it up
    if (contPos.hUp === false) {
      newPosY = - (contData.height + childData.height + (contData.top - childData.top));
    }

    // if (process.env.NODE_ENV === 'development') {
    //   console.table(contPos)
    //   console.table({ newPosX: newPosX, newPosY: newPosY })
    // }

    contDiv.style.transform = `translate(${newPosX}px, ${newPosY}px)`;
    contDiv.style.transform = `translate(${moveRatio(childData, contData)}px, ${newPosY}px)`;
  };
  const moveRatio: MoveRatioAction = (childData: DOMRect, contData: DOMRect): number => {
    // console.log('moveRatio: childData', childData, 'contData', contData)

    let newPos: number = 0;

    if ((contData.right - childData.right) / 2 >= contData.left) {
      newPos = - contData.left + 10;
    } else {
      newPos = - ((contData.right - childData.right) / 2);
    }

    // console.log('returning', newPos)

    return newPos;
  };

  const openMain: () => void = (): void => {
    const $idMain: HTMLElement | null = document.getElementById(idMain.current as string);

    if ($idMain) {
      $idMain.style.visibility = 'visible';
    }
  };
  const openMainProc: () => void = (): void => {
    calcPos();
    openMain();
    openBack();
    openCont();
  };
  const closeMainProc: () => void = (): void => {
    closeBack();
    closeCont();
  };
  // Both components cannot be hovered to close the modal
  const checkClose: () => void = (): void => {
    setTimeout(() => {
      if (childRef.current !== true && contRef.current !== true) {
        closeMainProc();
      }
    }, 100);
  };

  // Mouse enter / Mouse Leave 🖱️
  const onMouseEnterChild: () => void = (): void => {
    childRef.current = true;

    setTimeout((): void => {
      if (childRef.current === true) {
        openMainProc();
      }
    }, 200);
  };
  const onMouseLeaveChild: () => void = (): void => {
    childRef.current = false;
    checkClose();
  };
  const onMouseEnterCont: () => void = (): void => {
    contRef.current = true;
  };
  const onMouseLeaveCont: () => void = (): void => {
    contRef.current = false;
    checkClose();
  };

  // caclPos on start to avoid errors
  useEffect((): void => {
    if (propsDic.General.active === true) {
      calcPos();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    propsDic.General.active === true
      ? (
        <div
          className="ModalHoverMainDiv"
          style={ModalHoverMainDivStyles}
          id={idMain.current = 'Main-' + Math.floor(Math.random() * 10000)}
        >
          <div
            className="ModalHoverBack"
            style={ModalHoverBackStyles}
            id={idBack.current = 'Back-' + Math.floor(Math.random() * 10000)}
          />
          <div
            className="ModalHoverChild"
            style={ModalHoverChildStyles}
            onMouseEnter={onMouseEnterChild}
            onMouseLeave={onMouseLeaveChild}
            id={idChild.current = 'Child-' + Math.floor(Math.random() * 10000)}
          >
            <div style={{ position: 'relative' }}>
              {propsDic.General.legend === true && (
                <div style={ModalHoverLegendStyles}>
                  {propsDic.General.legendMsg}
                </div>
              )}
            </div>
            {props.children}
          </div>
          <div
            className="ModalHoverCont"
            style={ModalHoverContStyles}
            id={idCont.current = 'Cont-' + Math.floor(Math.random() * 10000)}
            onMouseEnter={onMouseEnterCont}
            onMouseLeave={onMouseLeaveCont}
          >
            {props.onHover}
          </div>
        </div>
      )
      : <>{props.children}</>
  );
}
