import React from 'react';
import styles from './OfflineNotification.module.scss'

const OfflineNotification = ({clicked}) => {
    return (
        <div className={styles.OfflineNotification} onClick={clicked}>
            <h4 className="pl-2">Hey There!    <span className="d-inline-block pl-5" style={{color:"crimson"}}>X</span></h4>
            <p>We built this app so you can access the info you need whenever, even offline!</p>
        </div>
    )
}

export default OfflineNotification
