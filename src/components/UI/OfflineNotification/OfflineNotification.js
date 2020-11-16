import React from 'react';
import styles from './OfflineNotification.module.scss'

const OfflineNotification = () => {
    return (
        <div className={styles.OfflineNotification} >
            <h4 className="pl-2">Did You Know?</h4>
            <p>TripMix is available offline! Keep yourself and your friends safe and informed wherever you go.</p>
        </div>
    )
}

export default OfflineNotification
