import MH_Content from '../MH_Content/MH_Content'
import './MH_Main.css'

const MH_Main = () => {
    return (
        <div className="MH_MainDiv">
            <div className="MH_Back">

            </div>
            <div className="MH_Child">
                {props.child}
            </div>
            <div className="MH_Cont">
                <MH_Content content={props.onHover}/>
            </div>
        </div>
    )
}

export default MH_Main