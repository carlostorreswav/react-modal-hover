import { CSSProperties } from 'react';

import { ModalHoverProps, PropsDicConfig } from './interfaces';

export function _propsDic({
  active,
  BackgroundStyles,
  ContentStyles,
  Fades,
  legend,
  legendMsg,
  legendPos,
  LegendStyles,
}: ModalHoverProps): PropsDicConfig {
  const prevLegendPos = (
    legendPos === 'right' || (!legendPos ? 'right' : (legendPos === 'left' ? 'left' : 'right'))
  );

  return {
    BackgroundStyles: {
      display: 'none',
      position: 'fixed',
      zIndex: 999999997,
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor:
        BackgroundStyles && BackgroundStyles.backgroundColor
          ? BackgroundStyles.backgroundColor
          : 'rgba(0, 0, 0, 0.75)',
    },
    ContentStyles:{
      display: 'none',
      position: 'absolute',
      zIndex: 999999998,
      wordWrap: 'break-word',
      backgroundColor:
        ContentStyles && ContentStyles.backgroundColor
          ? ContentStyles.backgroundColor
          : 'rgba(0, 0, 0, 1)',
      maxWidth:
        ContentStyles && ContentStyles.maxWidth
          ? ContentStyles.maxWidth
          : '100%',
      borderRadius:
        ContentStyles && ContentStyles.borderRadius
        ? ContentStyles.borderRadius
        : '8px',
      boxShadow:
        ContentStyles && ContentStyles.boxShadow
          ? ContentStyles.boxShadow
          : '0 0 10px 0 black',
      color:
        ContentStyles && ContentStyles.color
          ? ContentStyles.color
          : 'white',
      padding:
        ContentStyles && ContentStyles.padding
          ? ContentStyles.padding
          : '10px 20px',
      border:
        ContentStyles && ContentStyles.border
          ? ContentStyles.border
          : '2px solid orange',
      marginLeft:
        ContentStyles && ContentStyles.marginLeft
          ? ContentStyles.marginLeft
          : '20px',
      marginRight:
        ContentStyles && ContentStyles.marginRight
          ? ContentStyles.marginRight
          : '20px',
    },
    Fades: {
      backFadeIn:
        Fades && Fades.backFadeIn
          ? Fades.backFadeIn
          : '1s ease',
      backFadeOut:
        Fades && Fades.backFadeOut
          ? Fades.backFadeOut
          : '.3s ease',
      contFadeIn:
        Fades && Fades.contFadeIn
          ? Fades.contFadeIn
          : '1s ease',
      contFadeOut:
        Fades && Fades.contFadeOut
          ? Fades.contFadeOut
          : '.3s ease',
    },
    LegendStyles: ((): CSSProperties => {
      const styles: CSSProperties = {
        position: 'absolute',
        top: '0',
        marginTop:
          LegendStyles && LegendStyles.marginTop
            ? LegendStyles.marginTop
            : '0px',
        marginLeft:
          LegendStyles && LegendStyles.marginLeft
            ? LegendStyles.marginLeft
            : '0px',
        color:
          LegendStyles && LegendStyles.color
            ? LegendStyles.color
            : 'white',
        backgroundColor:
          LegendStyles && LegendStyles.backgroundColor
            ? LegendStyles.backgroundColor
            : 'orange',
        borderRadius:
          LegendStyles && LegendStyles.borderRadius
            ? LegendStyles.borderRadius
            : '50px',
        minHeight:
          LegendStyles && LegendStyles.minHeight
            ? LegendStyles.minHeight
            : '20px',
        minWidth:
          LegendStyles && LegendStyles.minWidth
            ? LegendStyles.minWidth
            : '20px',
        padding:
          LegendStyles && LegendStyles.padding
            ? LegendStyles.padding
            : '2px 2px',
        display:
          LegendStyles && LegendStyles.display
            ? LegendStyles.display
            : 'flex',
        justifyContent:
          LegendStyles && LegendStyles.justifyContent
            ? LegendStyles.justifyContent
            : 'space-around',
        alignItems:
          LegendStyles && LegendStyles.alignItems
            ? LegendStyles.alignItems
            : 'center',
        cursor:
          LegendStyles && LegendStyles.cursor
            ? LegendStyles.cursor
            : 'pointer',
        boxShadow:
          LegendStyles && LegendStyles.boxShadow
            ? LegendStyles.boxShadow
            : '0 0 5px 0 black',
        fontSize:
          LegendStyles && LegendStyles.fontSize
            ? LegendStyles.fontSize
            : '16px',
        fontWeight:
          LegendStyles && LegendStyles.fontWeight
            ? LegendStyles.fontWeight
            : 'bold',
      };

      if (prevLegendPos === 'right') {
        styles.right = '0';
      } else if (prevLegendPos === 'left') {
        styles.left = '0';
      }

      return styles;
    })(),
    General: {
      active: active === false ? false : true,
      legend: legend === false ? false : true,
      legendMsg: legendMsg ? legendMsg : '?',
      legendPos: prevLegendPos,
    },
    MainDivStyles : {
      visibility: 'hidden',
      margin:'0 auto'
    },
    ChildStyles: {
      visibility: 'hidden',
      zIndex: 999999999,
    },
  };
}
