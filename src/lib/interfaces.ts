import { CSSProperties, ReactNode } from 'react';

export type MoveProcAction = (
  contPos: ContentPosition,
  childData: DOMRect,
  contData: DOMRect,
  contDiv: HTMLElement,
) => void;

export interface ContentPosition {
  hUp: boolean;
  wLeft: boolean;
  wCenter: boolean;
  wRight: boolean;
  isBig: boolean;
}

export interface PropsDicConfig {
  BackgroundStyles: CSSProperties;
  ContentStyles: CSSProperties;
  Fades: {
    backFadeIn?: string;
    backFadeOut?: string;
    contFadeIn?: string;
    contFadeOut?: string;
  };
  LegendStyles: CSSProperties;
  General: {
    active?: boolean;
    legend?: boolean;
    legendMsg?: string;
    legendPos?: boolean | string;
  };
  MainDivStyles: CSSProperties;
  ChildStyles: CSSProperties;
}

export interface ModalHoverProps {
  active?: boolean;
  BackgroundStyles?: CSSProperties;
  children?: ReactNode;
  ChildStyles?: CSSProperties;
  ContentStyles?: CSSProperties;
  Fades?: {
    backFadeIn?: string;
    backFadeOut?: string;
    contFadeIn?: string;
    contFadeOut?: string;
  };
  General?: {
    active?: boolean;
    legend?: boolean;
    legendMsg?: string;
    legendPos?: boolean | string;
  };
  legend?: boolean;
  legendMsg?: string;
  legendPos?: boolean | string;
  LegendStyles?: CSSProperties;
  logs?: boolean;
  MainDivStyles?: CSSProperties;
  onHover: JSX.Element;
}
