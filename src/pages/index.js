import React, { useState,useEffect } from "react"
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap"
import listQuery from "../utilityfunctions/list-query"
import compare from "../utilityfunctions/compare"
import Layout from "../components/layout"
import ComboPanel from "../components/combo-panel"
import DrugInfo from "../components/drug-info"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import image from "../images/refresh-svgrepo-com.svg"
import Input from "../components/Form/Input"
import { CSSTransition } from "react-transition-group"
import OfflineNotification from "../components/UI/OfflineNotification/OfflineNotification.js";
const IndexPage = ({ data }) => {
  const drugs = [...new Set(data.allDataJson.edges[0].node.names)]
  const fullInfo = [...new Set(data.allDataJson.edges[0].node.drugs)]
  const [filteredList, setFilteredList] = useState([])
  const [selectedDrugs, setSelectedDrugs] = useState([])
  const [searchForm, updateSearchForm] = useState("")
  const [detailedInfo, setDetailedInfo] = useState(undefined)
  const [tableInView, setTableInView] = useState(false)
  const [offlineSuccess, setOfflineSuccess] = useState(false);
useEffect(()=>{
  window.self.addEventListener( "activate", event => {
    setOfflineSuccess(true)
});
},[])
  const dataFetch = array => {
    const d1 = data.allDataJson.edges[0].node.drugs.find(
      obj => obj.name === array[0]
    )
    const d2 = data.allDataJson.edges[0].node.drugs.find(
      obj => obj.name === array[1]
    )
    setDetailedInfo(compare(d1, d2))
  }
  const handleInputChange = e => {
    updateSearchForm(e.target.value)
    setFilteredList(listQuery(drugs, e.target.value, undefined, fullInfo))
  }
  const handleFormSubmit = e => {
    e.preventDefault()
  }
  const handleListClick = (e,label) => {
    if(e.key === 'Tab') return;
    drugTouched(label)
  }
  const handleReset = () => {
    setFilteredList([])
    setSelectedDrugs([])
    updateSearchForm("")
    setDetailedInfo(undefined)
  }

  const drugTouched = drugName => {
    const length = selectedDrugs.length
    if (length < 1) {
      setSelectedDrugs([drugName])
      updateSearchForm("")
      setTableInView(true)
      setFilteredList([])
    }
    if (length === 1) {
      const newArray = selectedDrugs.concat(drugName)
      setSelectedDrugs(newArray)
      setFilteredList([])
      dataFetch(newArray)
    }
  }
  const triggerResetAnimation = () => {
    setTableInView(false)
  }

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container className="text-center">
        {detailedInfo && <ComboPanel info={detailedInfo} />}
        {selectedDrugs.length > 0 && (
          <div
            className="mb-3"
            id="refresh-box"
            role="button"
            tabIndex={0}
            onClick={triggerResetAnimation}
            onKeyDown={triggerResetAnimation}
          >
            <img id="refresh" src={image} width="15px" alt="" />
            <p className="m-0">{" Reset Search"}</p>
          </div>
        )}
        <CSSTransition in={selectedDrugs.length === 0} timeout={1000} unmountOnExit>
          <div className="Info-Panel my-4 F-Industry T-Outline">
            Combining information from Tripsit's factsheets and drug interactions to help you get the knowledge you need, when you need it.
          </div>
        </CSSTransition>
        <Row>
          <Col xs={12}>
            <CSSTransition
              timeout={{ exit: 1000, enter: 1000 }}
              in={selectedDrugs && selectedDrugs.length < 2}
              unmountOnExit
              mountOnEnter
            >
              <form
                onSubmit={handleFormSubmit}
                className="mx-auto mb-5 mt-2"
                style={{ maxWidth: "500px", width: "100%" }}
              >
                <Input
                  placeholder={
                    selectedDrugs.length < 1
                      ? "I want to know about..."
                      : `Will it interact with...`
                  }
                  onChange={handleInputChange}
                  value={searchForm}
                />
                {filteredList.length > 0 && (
                  <ul>
                    {filteredList.map((el, i) => (
                      <li key={`${el}${i}`}>
                        <button
                          tabIndex={i}
                          onClick={(e) => handleListClick(e, el)}
                          onKeyDown={(e) => handleListClick(e, el)}
                        >
                          {el}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </CSSTransition>
          </Col>
        </Row>
        {offlineSuccess && <OfflineNotification clicked={()=>setOfflineSuccess(false)}/>}
        <CSSTransition in={tableInView} timeout={600} onExited={handleReset}>
          <Row
            style={{
              boxShadow: "10px 10px 20px rgba(0,0,0,0.1)",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
            id="DrugInfoContainer"
          >
            <Col xs={12}>
              <Tabs
                defaultActiveKey="key1"
                activeKey={selectedDrugs.length === 1 ? "key1" : undefined}
                id="tabs"
              >
                {selectedDrugs.length > 0 && (
                  <Tab eventKey="key1" title={selectedDrugs[0]}>
                    <DrugInfo
                      drug={data.allDataJson.edges[0].node.drugs.find(
                        el => el.name === selectedDrugs[0]
                      )}
                    />
                  </Tab>
                )}
                {selectedDrugs.length > 1 && (
                  <Tab eventKey="key2" title={selectedDrugs[1]}>
                    <DrugInfo
                      drug={data.allDataJson.edges[0].node.drugs.find(
                        el => el.name === selectedDrugs[1]
                      )}
                    />
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        </CSSTransition>
      </Container>
    </Layout>
  )
}

export default IndexPage
export const query = graphql`
  {
    allDataJson {
      edges {
        node {
          drugs {
            aliases
            labels
            name
            url
            interactions {
              name
              category
              details
            }
            effects
            summary
            duration {
              After_effects
              Duration
              Onset
              method
            }
            dose {
              Common
              Dangerous
              First_Plateau
              Fourth
              Heavy
              Insufflated
              Light
              Low
              M_Hole
              Moderate
              Medium
              NOTE
              Note
              Oral
              Second_Plateau
              Strong
              Third_Plateau
              Threshold
              dose
              method
              strong
            }
          }
          names
        }
      }
    }
  }
`
