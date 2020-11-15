import React from "react"
import styles from "./drug-info.module.scss"
import Label from "./Tags/Tags"
import capitalize from "../utilityfunctions/capitalize"
import Expandable from "./UI/Expandable";
import Link from '../images/link.svg';

const DrugInfo = ({ drug }) => {
  const drugCats = {}
  if (drug.interactions && drug.interactions.length > 0) {
    drug.interactions.forEach(({ name, details, category }, i) => {
      if (!drugCats[category]) {
        drugCats[category] = [{ name, details }]
      } else {
        drugCats[category].push({ name, details })
      }
    })
  }
  const mapMixes = cat => {
    return cat.map((el, i) => {
      return (
        <li key={i} className="Bold">
          {el.name}
        </li>
      )
    })
  }

  return (
    <div className={styles.DrugInfo}>
      {drug.summary && drug.summary.length > 0 && (
        <>
          <h3 className="pt-1 pb-2">Summary</h3>
          <p>{drug.summary}</p>
        </>
      )}
      {drug.aliases && drug.aliases.length > 0 && (
        <>
          <h3 className="y-3">Aliases</h3>
          <p>{drug.aliases.length > 0 && drug.aliases.join(", ")}</p>
        </>
      )}
      {drug.effects && drug.effects.length > 0 && (
        <>
          <h3 className="y-3">Effects</h3>
          <p>{drug.effects.length > 0 && drug.effects}</p>
        </>
      )}
      {drug.dose && drug.dose.length > 0 && (
        <>
          <h3 className="py-3">Dosage</h3>
          <ul>
            {drug.dose.length > 0 &&
              drug.dose.map(method => (
                <li key={method.method} className={styles.table}>
                  <h4 className="Bold">{method.method}</h4>
                  <ul>
                    {Object.entries(method)
                      .filter(([x, y]) => x !== "method" && y !== null)
                      .sort(([key, value], [keyb, valueb]) => {
                        const initVal = value.split("-")[0]
                        const compareVal = valueb.split("-")[0]
                        console.log(compareVal, initVal, "Values")
                        return parseFloat(initVal) > parseFloat(compareVal)
                          ? 1
                          : -1
                      })
                      .map(([key, value]) => {
                        console.log(key, value)
                        return value !== null ? (
                          <li key={key}>
                            <span>{key}:</span> <span>{value}</span>
                          </li>
                        ) : null
                      })}
                  </ul>
                </li>
              ))}
          </ul>
        </>
      )}
      {drug.duration && drug.duration.length > 0 && (
        <>
          <h3 className="py-3">Duration</h3>
          <ul className="mb-3">
            {drug.duration.length > 0 &&
              drug.duration.map(method => (
                <li key={method.method} className={styles.table}>
                  <h4 className="Bold">{method.method}</h4>
                  <ul>
                    {method["Onset"] && (
                      <li>
                        <span>Onset:</span> <span>{method["Onset"]}</span>
                      </li>
                    )}
                    {method["Duration"] && (
                      <li>
                        <span>Duration:</span> <span>{method["Duration"]}</span>
                      </li>
                    )}
                    {method["After_effects"] && (
                      <li>
                        <span>After-Effects:</span>{" "}
                        <span>{method["After_effects"]}</span>
                      </li>
                    )}
                  </ul>
                </li>
              ))}
          </ul>
        </>
      )}
      {drug.labels && (
        <>
          <h3 className="py-3">Labels</h3>
          <Label categories={drug.labels.filter(label => label.length > 2)} />
        </>
      )}
      {drug.interactions && drug.interactions.length > 0 && (
        <>
          <h3 className="py-3">Other Mix Info</h3>
          {Object.keys(drugCats).map((cat, i) => {
            let header = cat
            switch (cat) {
              case "lowdec":
                header = "Low Risk & Decreased Activity"
                break
              case "lowno":
                header = "Low Risk & No Synergy"
                break
              case "lowinc":
                header = "Low Risk & Synergy"
                break
              default:
                break
            }
            return (
              drugCats[cat] && (
                <Expandable
                  header={capitalize(header)}
                  classes={styles[cat]}
                  key={i}
                >
                  <ul className={styles[cat] + " py-3"}>
                    {mapMixes(drugCats[cat])}
                  </ul>
                </Expandable>
              )
            )
          })}
        </>
      )}
      {drug.url && (
        <>
          <h3 className="pt-4 pb-3">Tripsit Link <img src={Link} width="18px" alt=""/></h3>
          <a href={drug.url} rel="noreferrer" target="_blank">{drug.url}</a>
        </>
      )}
    </div>
  )
}

export default DrugInfo
