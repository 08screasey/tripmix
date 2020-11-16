import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import styles from './Expandable.module.scss';

const Expandable = ({header, classes, children}) => {
    const [open, toggle] = useState(false)
    return (
        <Collapsible classParentString={classes + " Collapsible"} 
        transitionTime={150}
        onOpening={()=>toggle(true)}
        onClosing={()=>toggle(false)}
         trigger={<h4
          className={"Bold "}
           style={{cursor:'pointer'}}>
           {header}
         <span style={{transform: !open ? 'rotateZ(0deg)':'rotateZ(180deg)'}} 
         className={styles.arrow_down}>
         </span>
         </h4>}>
                <div className={styles.collapsible}>
                    {children}
                </div>
        </Collapsible>
    )
}

export default Expandable
