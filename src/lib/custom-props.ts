import { CSSProperties } from 'react';

import { ModalHoverProps, PropsDicConfig } from './interfaces';

export const ModalHoverMainDivStyles: CSSProperties = {
  visibility: 'hidden',
  margin: '0 auto',
};

export const ModalHoverChildStyles: CSSProperties = {
  visibility: 'hidden',
  zIndex: 999999999,
};

export function _propsDic({
  active,
  BackStyles,
  ContStyles,
  Fades,
  legend,
  legendMsg,
  legendPos,
  LegendStyles,
}: ModalHoverProps): PropsDicConfig {
  return {
    BackStyles:{
      backgroundColor:
        BackStyles && BackStyles.backgroundColor
          ? BackStyles.backgroundColor
          : 'rgba(0, 0, 0, 0.75)',
    },
    ContStyles:{
      backgroundColor:
        ContStyles && ContStyles.backgroundColor
          ? ContStyles.backgroundColor
          : 'rgba(0, 0, 0, 1)',
      maxWidth:
        ContStyles && ContStyles.maxWidth
          ? ContStyles.maxWidth
          : '100%',
      borderRadius:
        ContStyles && ContStyles.borderRadius
        ? ContStyles.borderRadius
        : '8px',
      boxShadow:
        ContStyles && ContStyles.boxShadow
          ? ContStyles.boxShadow
          : '0 0 10px 2px black',
      color:
        ContStyles && ContStyles.color
          ? ContStyles.color
          : 'white',
      padding:
        ContStyles && ContStyles.padding
          ? ContStyles.padding
          : '10px 20px',
      border:
        ContStyles && ContStyles.border
          ? ContStyles.border
          : '2px solid orange',
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
    LegendStyles: {
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
    },
    General: {
      active: active === false ? false : true,
      legend: legend === false ? false : true,
      legendMsg: legendMsg ? legendMsg : '?',
      legendPos: legendPos ? legendPos : 'right',
    },
  };
}

export function _ModalHoverBackStyles({ BackStyles }: PropsDicConfig): CSSProperties {
  return {
    display: 'none',
    position: 'fixed',
    zIndex: 999999997,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: BackStyles.backgroundColor,
  };
}

export function _ModalHoverContStyles({ ContStyles }: PropsDicConfig): CSSProperties {
  return {
    display: 'none',
    position: 'absolute',
    zIndex: 999999998,
    wordWrap: 'break-word',
    maxWidth: ContStyles.maxWidth,
    backgroundColor: ContStyles.backgroundColor,
    borderRadius: ContStyles.borderRadius,
    boxShadow: ContStyles.boxShadow,
    color: ContStyles.color,
    padding: ContStyles.padding,
    border: ContStyles.border,
  };
}

export function _ModalHoverLegendStyles({ General, LegendStyles }: PropsDicConfig): CSSProperties {
  const styles: CSSProperties = {
    position: 'absolute',
    top: '0',
    backgroundColor: LegendStyles.backgroundColor,
    borderRadius: LegendStyles.borderRadius,
    minHeight: LegendStyles.minHeight,
    minWidth: LegendStyles.minWidth,
    padding: LegendStyles.padding,
    display: LegendStyles.display,
    justifyContent: LegendStyles.justifyContent,
    alignItems: LegendStyles.alignItems,
    cursor: LegendStyles.cursor,
    boxShadow: LegendStyles.boxShadow,
    fontSize: LegendStyles.fontSize,
    fontWeight: LegendStyles.fontWeight,
    color: LegendStyles.color,
  };

  if (General.legendPos === 'right') {
    styles.right = '0';
  } else if (General.legendPos === 'left') {
    styles.left = '0';
  }

  return styles;
}
