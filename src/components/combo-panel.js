import React from 'react';
import styles from './combo-panel.module.scss';

const ComboPanel = ({info}) => {
    let renderCategory = ""
    switch(info.category){
        case "dangerous":
            renderCategory = "Dangerous";
            break;
        case "unsafe":
            renderCategory = "Unsafe";
            break;
        case "caution":
            renderCategory = "Caution";
            break;
        case "lowno":
            renderCategory = "Low-Risk & No Synergy";
            break;
        case "lowinc":
            renderCategory = "Low-Risk & Synergy";
            break;
        case "lowdec":
            renderCategory = "Low Risk & Decreased Effects";
            break;

    }
    return (
        <div className={styles.Combo_Panel+" "+styles[info.category] + " F-Industry mt-5"} style={{marginBottom:"30px"}}>
            <h2 className="Bold">{renderCategory}</h2>
            {info.details !== "No additional Information" && <p className="Bold">{info.details}</p>}
        </div>
    )
}

export default ComboPanel
