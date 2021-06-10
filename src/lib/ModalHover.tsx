import React, { useEffect, useRef } from 'react';

import {
  ContentPosition,
  ModalHoverProps,
  MoveProcAction,
} from './interfaces';
import {
  _propsDic,
} from './custom-props';

import './styles.css';

export function ModalHover(props: ModalHoverProps): JSX.Element {
  // Styles
  const propsDic = _propsDic(props);

  // References
  const childRef = useRef({});
  const contRef = useRef({});

  const idBack = useRef({});
  const idChild = useRef({});
  const idCont = useRef({});
  const idMain = useRef({});
  const idLegend = React.useRef({});
  const idDynChild = React.useRef({});

  const openBack: () => void = (): void => {
    const $idMain: HTMLElement | null = document.getElementById(idMain.current as string);
    const $idChild: HTMLElement | null = document.getElementById(idChild.current as string);

    if ($idMain && $idChild) {
      $idMain.style.visibility = "visible";
      $idChild.style.position = "relative";

      setTimeout(() => {
        const $idBack: HTMLElement | null = document.getElementById(idBack.current as string);

        if ($idBack) {
          $idBack.style.display = "block";
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

  const adjustLegend: (childData: DOMRect) => void = (childData: DOMRect): void => {
    if (props.legend !== false) {
      const LegendDiv: HTMLElement = document.getElementById(idLegend.current as string) as HTMLElement;
      const LegendData: DOMRect = LegendDiv.getBoundingClientRect();
      const prevMarginTop = Number((propsDic.LegendStyles.marginTop as string).replace(/px$/, ''));
      const prevMarginLeft = Number((propsDic.LegendStyles.marginLeft as string).replace(/px$/, ''));
      const newX = - (LegendData.width / 2 + prevMarginLeft);
      const newY = - (LegendData.height / 2) + prevMarginTop - (childData.height);

      LegendDiv.style.margin = `${newY}px ${newX}px`;
    }
  };

  // Calculating position of the Children
  const calcPos: () => void = (): void => {
    const $idChild: HTMLElement | null = document.querySelector(`[idDynChild=${idDynChild.current}]`);
    const $idCont: HTMLElement | null = document.getElementById(idCont.current as string);

    if (!$idChild && !$idCont) {
      return;
    }

    const childDiv: HTMLElement = $idChild as HTMLElement;
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

    if (props.logs) {
      console.table(contPos);
    }

    adjustLegend(childData);
    moveProc(contPos, childData, contData, contDiv);
  };

  const moveX: (
    childData: DOMRect, contData: DOMRect, contPos: ContentPosition,
  ) => number = (childData: DOMRect, contData: DOMRect, contPos: ContentPosition): number => {
    //HARDEST PROCEDURE ON DEV 👨‍💻
    let newPos = 0;

    if (contPos.wCenter && !contPos.isBig) {
      const childMidPoint = childData.left + (childData.width / 2);
      const contMidPoint = contData.left + (contData.width / 2);

      newPos = - (contMidPoint - childMidPoint);
    }

    return newPos;
  }

  // Moving the content aside the children
  const moveProc: MoveProcAction = (
    contPos: ContentPosition,
    childData: DOMRect,
    contData: DOMRect,
    contDiv: HTMLElement,
  ): void => {
    let newPosY = 0;

    if (contPos.hUp === false) {
      let newLegHeight = 0;

      if (props.legend !== false) {
        const $idLegend: HTMLElement = document.getElementById(idLegend.current as string) as HTMLElement;

        newLegHeight = $idLegend.getBoundingClientRect().height;
      }

      newPosY = - (contData.height + childData.height + newLegHeight);
    }

    contDiv.style.transform = `translate(${moveX(childData, contData, contPos)}px, ${newPosY }px)`;
  };
  const checkClose: () => void = (): void => {
    setTimeout(() => {
      if (childRef.current !== true && contRef.current !== true) {
        closeBack();
        closeCont();
      }
    }, 100);
  };

  const createLegend = async (): Promise<unknown> => {
    return new Promise((resolve): void => {
      let MetaLegDiv: HTMLDivElement = document.createElement('div');

      MetaLegDiv.style.position = "relative";

      const LegDiv: HTMLDivElement = document.createElement('div');

      LegDiv.innerText = propsDic.General.legendMsg as string;
      LegDiv.id = idLegend.current = 'Legend-' + Math.floor(Math.random() * 10000);

      Object.entries(propsDic.LegendStyles).forEach((elm: [string, any]): void => {
        (LegDiv.style as any)[elm[0]] = elm[1];
      });

      if (props.legend === false) {
        LegDiv.style.visibility = "hidden";
      }

      // Get the parent element
      const parentElement: HTMLElement = document.getElementById(idChild.current as string) as HTMLElement;
      // Get the parent's first child
      const theFirstChild: HTMLElement = parentElement.firstChild as HTMLElement;

      MetaLegDiv.appendChild(LegDiv);

      //idDynChild
      theFirstChild.setAttribute(
        'idDynChild',
        idDynChild.current = 'idDynChild-' + Math.floor(Math.random() * 10000),
      );

      // Create a new element
      const hArray = ["H1", "H2", "H3", "H4", "H5", "H6"];

      if (hArray.includes(theFirstChild.nodeName)){
        theFirstChild.appendChild(MetaLegDiv);
      } else {
        theFirstChild.appendChild(MetaLegDiv);
      }

      resolve(true);
    });
  }

  const startProc = async (): Promise<void> => {
    const res = await createLegend();

    if (res === true) {
      calcPos();
    }
  }

  // caclPos on start to avoid errors
  useEffect((): void => {
    if (propsDic.General.active === true) {
      if (props.children && (props.children as any).$$typeof === Symbol.for('react.element')) {
        startProc();
      } else {
        throw new Error('react-modal-hover needs a children and is empty');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.LegendStyles, props.ContentStyles, props.BackgroundStyles])

  console.log('propsDic.General ->', propsDic.General);

  return (
    propsDic.General.active === true
      ? (
        <div
          className="ModalHoverMainDiv"
          style={propsDic.MainDivStyles}
          id={idMain.current = 'Main-' + Math.floor(Math.random() * 10000)}
        >
          <div
            className="ModalHoverBack"
            style={propsDic.BackgroundStyles}
            id={idBack.current = 'Back-' + Math.floor(Math.random() * 10000)}
          />
          <div
            className="ModalHoverChild"
            style={propsDic.ChildStyles}
            onMouseEnter={(): void => {
              childRef.current = true;

              setTimeout((): void => {
                if (childRef.current === true) {
                  calcPos();
                  openBack();
                  openCont();
                }
              }, 200);
            }}
            onMouseLeave={(): void => {
              childRef.current = false;
              checkClose();
            }}
            id={idChild.current = 'Child-' + Math.floor(Math.random() * 10000)}
          >
            {props.children}
          </div>
          <div
            className="ModalHoverCont"
            style={propsDic.ContentStyles}
            id={idCont.current = 'Cont-' + Math.floor(Math.random() * 10000)}
            onMouseEnter={(): void => {
              contRef.current = true;
            }}
            onMouseLeave={(): void => {
              contRef.current = false;
              checkClose();
            }}
          >
              {props.onHover}
          </div>
        </div>
      )
      : <>{props.children}</>
  )
}
