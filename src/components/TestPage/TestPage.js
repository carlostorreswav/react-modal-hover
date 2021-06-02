import './TestPage.css'
import ModalHover from '../ModalHover/ModalHover'

const TestPage = () => {
    return (
        <div className="TestPageMainDiv">
        <h1>This is TestPage</h1>
        <ModalHover onHover={<h1>I'm The Contentsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsg</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>


        <ModalHover onHover={<h1>I'm The Conasdfsdtent</h1>}>
            <div id="firstDiv" className="centered">
            <button>IM THE FIRST CHILDREN</button>
            </div>
        </ModalHover>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ModalHover onHover={<h1>I'm The Conasdfsdtent</h1>}>
            <button >IM THE FIRST CHILDREN</button>
        </ModalHover>
        <br/><br/><br/><br/><br/>
        <ModalHover onHover={<h1>I'm The Contentsdffffffffsg</h1>}>
            <div className="fullcenter">
                <button >IM THE FIRST CHILDREN</button>
            </div>
        </ModalHover>   
        <br/><br/><br/><br/><br/>
        <ModalHover onHover={<h1>I'm The Conteffsg</h1>}>
            <button  >IM THE FIRST CHILDREN</button>
        </ModalHover>   
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <ModalHover onHover={<h1>ffffffffffffffffffffffffsg</h1>}>
            <button >IM THE FIRST CHdfgILDREN</button>
        </ModalHover>   
        <ModalHover compId="5div" onHover={<h1>ffffffdsfgsdfgdsfgdffffffffffffffffsdfgdsfgsfffsg</h1>}>
            <button >IM THE FIRST CHILDREN</button>
        </ModalHover>   
        </div>

    )
}

export default TestPage