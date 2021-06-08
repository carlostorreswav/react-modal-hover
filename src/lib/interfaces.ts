import { CSSProperties, ReactNode } from 'react';

export type MoveProcAction = (
  contPos: ContentPosition,
  childData: DOMRect,
  contData: DOMRect,
  contDiv: HTMLElement,
) => void;

export type MoveRatioAction = (
  childData: DOMRect,
  contData: DOMRect,
) => void;

export interface ContentPosition {
  hUp: boolean;
  wLeft: boolean;
  wCenter: boolean;
  wRight: boolean;
  isBig: boolean;
}

export interface PropsDicConfig {
  BackStyles: CSSProperties;
  ContStyles: CSSProperties;
  Fades: {
    backFadeIn: string;
    backFadeOut: string;
    contFadeIn: string;
    contFadeOut: string;
  };
  LegendStyles: CSSProperties;
  General: {
    active: boolean;
    legend: boolean;
    legendMsg: string;
    legendPos: string;
  };
}

export interface ModalHoverProps {
  active?: boolean;
  BackStyles?: CSSProperties;
  children?: ReactNode;
  ContStyles?: CSSProperties;
  Fades?: {
    backFadeIn: string;
    backFadeOut: string;
    contFadeIn: string;
    contFadeOut: string;
  };
  legend?: boolean;
  legendMsg?: string;
  legendPos?: string;
  LegendStyles?: CSSProperties;
  onHover: JSX.Element;
}
