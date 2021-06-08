import './TestPage.css'
import ModalHover from '../lib/index'

const TestPage = () => {
    return (
        <>
            <div className="TestPageMainDiv">
            <h1>react-modal-hover</h1>
            <hr></hr>
            </div>
            <ModalHover logs={true} onHover={<h1>Thfghjfghgjffhjxt</h1>}>
                <h1 className="toHover1">Hover me!</h1>
            </ModalHover>
            <ModalHover logs={true} onHover={<h1>Tdfghdfghdfghfdghis  text</h1>}>
                <div className="toHover2">Hover me!</div>
            </ModalHover>
            <ModalHover logs={true} onHover={<h1>This is a very long text This is a very long text This is a very long text This is a very long textThis is a very long text This is a very long text This is a very long text This is a very long textThis is a very long text This is a very long text This is a very long text This is a very long textThis is a very long text This is a very long text This is a very long text This is a very long text</h1>}>
                <h1 className="toHover3">Hover me!</h1>
            </ModalHover>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <ModalHover logs={true} onHover={<h1>This is normal text</h1>}>
                <h1 className="toHover1">Hover me!</h1>
            </ModalHover>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <ModalHover logs={true} onHover={<h1>This is a very long text This is a very long textThis is a very long textThis is a very long textThis is a very long text</h1>}>
                <h1 className="toHover1">Hover me!</h1>
            </ModalHover>
        </>
    )
}

export default TestPage