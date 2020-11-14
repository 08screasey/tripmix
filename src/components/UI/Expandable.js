import React, {useState} from 'react';
import styles from './Expandable.module.scss';

const Expandable = (props) => {
    const [expanded, set] = useState(false)
    return (
        <div className={props.classes + " " + styles.expandable} style={{boxShadow:"-0px -4px 5px rgba(0,0,0,0.2)"}}>
        <h4 onClick={()=>set(!expanded)} className="Bold" style={{cursor:'pointer'}}>{props.header}<span className={styles.arrow_down} style={{transform:expanded ? "rotateZ(180deg)" : "none"}}></span></h4>
                <div style={{transition:"0.5s ease-out", maxHeight:expanded ? "500px" 
                : "0px", overflow:"hidden"}} className={styles.collapsible}>
                    {props.children}
                </div>
        </div>
    )
}

export default Expandable
