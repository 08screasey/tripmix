import React from 'react';
import Collapsible from 'react-collapsible';
import styles from './Expandable.module.scss';

const Expandable = ({header, classes, children}) => {
    return (
        <Collapsible classParentString={classes + " Collapsible"} timeout={200} trigger={<h4 className={"Bold "} style={{cursor:'pointer'}}>{header}<span className={styles.arrow_down}></span></h4>}>
        
                <div className={styles.collapsible}>
                    {children}
                </div>
        </Collapsible>
    )
}

export default Expandable
