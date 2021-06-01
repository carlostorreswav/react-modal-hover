import './TestPage.css'
import ModalHover from '../ModalHover/ModalHover'

const TestPage = () => {
    return (
        <div className="TestPageMainDiv">
        <h1>This is TestPage</h1>
        <ModalHover onHover={<h1>I'm The Content</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>
        <ModalHover onHover={<h1>I'm The Content</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>
        <ModalHover onHover={<h1>I'm The Content</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>
        <ModalHover onHover={<h1>I'm The Content</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>
        <ModalHover onHover={<h1>I'm The Content</h1>}>
            <button>IM THE FIRST CHILDREN</button>
        </ModalHover>
        </div>

    )
}

export default TestPage