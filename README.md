This repo is no longer maintained because I'm focus on [MusicWall](https://musicwall.app)

# __react-modal-hover__

<img src="shared/rmh.gif" alt="drawing" style="width:500px"/>

<br>

## __How it works 🤔__
Hovering over the desired component will open a modal with another component shown as information
<br>
Take care with the `width` of the element you want to hover 🤟

### __There are 3 main elements on this component:__
####  __1 - Content__: the element to show when user hover the element
####  __2 - Legend__: the element to make users know some element is hoverable

####  __3 - Background__: a black transparent window when you hover


<br>

### 🚀 __Live Demo: https://onlyMastering.com/devmode__
<br>

## ✨ __Quick Start__ ✨
### __Install package from npm__ 📥
```npm i react-modal-hover```

### Import it on your .js 📥
```import { ModalHover } from 'react-modal-hover'```

### Prepare your "onHover" component or just a simple string

```
<ModalHover onHover={<h3>Hello World</h3>}>
  <div>Hover Me!</div>
<ModalHover/>
```
ℹ️ it's recommended to use ```<div>``` as first child, then whatever you want 😃
<br>

## __General Props__

ℹ️ Main props of the component, *legendMsg* is __?__ because is the typical tooltip map legend
<br>
ℹ️ if option `active={false}` ModalHover will not be even visible on the html

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|__active__|boolean|true|activate all the hover option
|__legend__|boolean|true|legend on top of your hover component
|__legendPos__|string|right|position of the legend on your hover component
|__legendMsg__|string|?|message of the legend

### __Example__

```
<ModalHover onHover={<MySocialMediaComponent/>} legendPos="left" legendMsg="Follow me!">
  <div>Author: Carlos Torres</div>
<ModalHover/>
```
<br>

## __Styled Props (CSS)__

ℹ️ Styling props, you can add it on objects or direct CSS, check examples below
### __BackgroundStyles__

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|__backgroundColor__|string|rgba(0, 0, 0, 0.75)|background-color, better with some transparency|

<br>

### __ContentStyles__

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|__backgroundColor__|string|rgba(0, 0, 0, 1)| content css property|
|__maxWidth__|string|100%| content css property|
|__borderRadius__|string|8px| content css property|
|__boxShadow__|string|0 0 10px 2px black| content css property|
|__color__|string|white| content css property|
|__padding__|string|10px 20px| content css property|
|__border__|string|2px solid grey| content css property|
|__marginLeft__|string|20px| content css property|
|__marginRight__|string|20px| content css property|


#### __Example with object__
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

<br>

### __LegendStyles__

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|__color__|string|white| Legend css property|
|__backgroundColor__|string|orange| Legend css property|
|__borderRadius__|string|50px| Legend css property|
|__minHeight__|string|20px| Legend css property|
|__minWidth__|string|20px| Legend css property|
|__padding__|string|2px 2px| Legend css property|
|__display__|string|flex| Legend css property|
|__justifyContent__|string|space-around| Legend css property|
|__alignItems__|string|center| Legend css property|
|__cursor__|string|pointer| Legend css property|
|__boxShadow__|string|0 0 5px 0 black| Legend css property|
|__fontSize__|string|16px| Legend css property|
|__fontWeight__|string|bold| Legend css property|
|__marginTop__|string|0px| Legend css property|
|__marginLeft__|string|0px| Legend css property|

#### __Example with direct css insert (just like in React)__
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

<br>

## __Fades__

ℹ️  You can set fade-in/out props to the background and the content, do it carefully ⚠️ :

|Option|Type|Default|Description|
|-------------|:-------------:|:-------------:|:-------------:|
|backFadeIn|string|1s ease|recommended fade in for background|
|backFadeOut|string|.3s ease|recommended fade out for background|
|contFadeIn|string|1s ease|recommended fade in for content|
|contFadeOut|string|.3s ease|recommended fade out for content|
#### __Example with Fades__
```
<ModalHover
    Fades={{backFadeIn:".5s linear", contFadeIn:".5s linear"}}
    legendMsg="info"
    >
  <div>Im other div that wants to be hovered</div>
<ModalHover/>
```
<br>

### __TypeScript__
This package does support TypeScript 🥰

<br>

# __Follow me! ✨__

__GitHub__ | <a href="https://github.com/carlostorreswav">@carlostorreswav<a/><br>
__Twitter__ | <a href="https://twitter.com/carlostorreswav">@carlostorreswav<a/><br>
__Linkedin__ | <a href="https://www.linkedin.com/in/carlos-torres-a8a459213/">Carlos Torres<a/>

### TypeScript support thanks to @ciensprog 🧡
