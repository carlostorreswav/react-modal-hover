# react-modal-hover (v1.0)
![](rmh.gif)

### How it works
Hovering over the desired component will open a modal with another component shown as information
<br>
This package does not yet support TypeScript, please PR me 🥰
<br>

#### Its three main elements on this component:
#####  1 - Background: a black transparent window when you hover
#####  2 - Legend: the element to make users know some element is hoverable
#####  3 - Content: the element to show when user hover the element

### Live Demo: https://onlyMastering.com/devmode 🚀
## Quick start
### Install package from npm ⬇️
`npm i react-modal-hover`

#### Import it on your .js 📥
`import { ModalHover } from 'react-modal-hover'`

#### Prepare your "onHover" component or just a simple string

```
<ModalHover onHover={<h3>Hello World</h3>}>
  <div>Hover Me!</div>
<ModalHover/>
```

## General Props

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|active|boolean|true|activate all the hover option
|legend|boolean|true|legend on top of your hover component
|legendPos|string|right|position of the legend on your hover component
|legendMsg|string|?|message of the legend
### Example

```
<ModalHover onHover={<MySocialMediaComponent/>} legendPos="left" legendMsg="More info about the creator">
  <div>Carlos Torres: frontEnd Developer</div>
<ModalHover/>
```

## Styled Props (CSS)

### BackgroundStyles

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|backgroundColor|string|rgba(0, 0, 0, 0.75)|background-color, better with some transparency|

### ContentStyles

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|backgroundColor|string|rgba(0, 0, 0, 1)| content css property|
|maxWidth|string|100%| content css property|
|borderRadius|string|8px| content css property|
|boxShadow|string|0 0 10px 2px black| content css property|
|color|string|white| content css property|
|padding|string|10px 20px| content css property|
|border|string|2px solid orange| content css property|

### Example with object
```
const MyContentStyles = {
    backgroundColor: "white",
    color: "black",
    padding: "20px 40px"
}
...
<ModalHover ContentStyles={MyContentStyles} onHover={<MyCompOnHover/>} legendMsg="HOVER ME!">
  <div>Im a div that wants to be hovered</div>
<ModalHover/>
```

### LegendStyles

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|color|string|white| Legend css property|
|backgroundColor|string|orange| Legend css property|
|borderRadius|string|50px| Legend css property|
|minHeight|string|20px| Legend css property|
|minWidth|string|20px| Legend css property|
|padding|string|2px 2px| Legend css property|
|display|string|flex| Legend css property|
|justifyContent|string|space-around| Legend css property|
|alignItems|string|center| Legend css property|
|cursor|string|pointer| Legend css property|
|boxShadow|string|0 0 5px 0 black| Legend css property|
|fontSize|string|16px| Legend css property|
|fontWeight|string|bold| Legend css property|

### Example with direct css insert (just like in React)
```
<ModalHover 
    ContentStyles={{color:"red", padding:"20px"}} 
    LegendStyles={{backgroundColor:"red"}} 
    onHover={<MyCompOnHover/>} 
    legendMsg="info"
    >
  <div>Im other div that wants to be hovered</div>
<ModalHover/>
```

## Fades

You can set fade-in/out props to the background and the content, do it carefully:

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|backFadeIn|string|1s ease|recommended fade in for background|
|backFadeOut|string|.3s ease|recommended fade out for background|
|contFadeIn|string|1s ease|recommended fade in for content|
|contFadeOut|string|.3s ease|recommended fade out for content|

### TypeScript support

At the moment this package has no TypeScript support, but PRs are really welcome :) 