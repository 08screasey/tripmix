import React, { useState } from "react"
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap"
import listQuery from '../utilityfunctions/list-query';
import compare from '../utilityfunctions/compare';
import Layout from "../components/layout";
import ComboPanel from '../components/combo-panel';
import DrugInfo from '../components/drug-info';
import SEO from "../components/seo";
import { graphql } from 'gatsby';
import Input from '../components/Form/Input';
import { CSSTransition } from 'react-transition-group';

const IndexPage = ({ data }) => {
  const drugs = data.allDataJson.edges[0].node.names;
  const fullInfo = data.allDataJson.edges[0].node.drugs;
  const [filteredList, setFilteredList] = useState([])
  const [selectedDrugs, setSelectedDrugs] = useState([])
  const [searchForm, updateSearchForm] = useState("")
  const [filterError, setFilterError] = useState(false)
  const [detailedInfo, setDetailedInfo] = useState(undefined)

  const dataFetch = (array) => {
    const d1 = data.allDataJson.edges[0].node.drugs.find((obj) => obj.name === array[0])
    const d2 = data.allDataJson.edges[0].node.drugs.find((obj) => obj.name === array[1])
    setDetailedInfo(compare(d1, d2))
  }
  const handleInputChange = (e) => {
    setFilterError(false)
    updateSearchForm(e.target.value)
    setFilteredList(listQuery(drugs, e.target.value, 5, fullInfo))
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  const handleListClick = (label) => {
    setFilterError(false)
    drugTouched(label)
  }
  const drugTouched = (drugName) => {
    const length = selectedDrugs.length
    setFilterError(false)
    if (length < 1) {
      setSelectedDrugs([drugName])
      updateSearchForm("")
      setFilteredList([])
    }
    if (length === 1) {
      const newArray = selectedDrugs.concat(drugName)
      setSelectedDrugs(newArray)
      setFilteredList([])
      dataFetch(newArray)
    }
  }

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container className="text-center">
      <Row>
        <Col xs={12}>
        <CSSTransition timeout={600} in={selectedDrugs && selectedDrugs.length < 2} unmountOnExit>
          <form onSubmit={handleFormSubmit} className="mx-auto mb-5" style={{ maxWidth: '500px', width: "100%" }}>
            <Input placeholder={selectedDrugs.length < 1 ? "Add your first drug" : "Add a second drug"} onChange={handleInputChange} value={searchForm} />
            {filteredList.length > 0 && (<ul>
              {filteredList.map(el => (<li key={el} onClick={() => handleListClick(el)}>{el}</li>))}
            </ul>)}
            <CSSTransition in={filterError} timeout={300} mountOnEnter unmountOnExit>
              <div className="Error-Bubble">
                {filteredList.length < 1 ? "No matches found. Consider changing your results" : "Too many matches, consider refining search"}
              </div>
            </CSSTransition>
          </form>
        </CSSTransition>
        </Col>
      </Row>
        
        {detailedInfo && <ComboPanel info={detailedInfo}/>}
        <Row style={{boxShadow:"10px 10px 20px rgba(0,0,0,0.1)", marginBottom:'20px'}}>
        <Col xs={12}>
        <Tabs defaultActiveKey="key1" id="tabs">
          {selectedDrugs.length > 0 && (<Tab eventKey="key1" title={selectedDrugs[0]}>
          <DrugInfo drug={data.allDataJson.edges[0].node.drugs.find((el)=>el.name===selectedDrugs[0])}/>
          </Tab>)}
          {selectedDrugs.length > 1 && (<Tab eventKey="key2" title={selectedDrugs[1]}>
          <DrugInfo drug={data.allDataJson.edges[0].node.drugs.find((el)=>el.name===selectedDrugs[1])}/>
          </Tab>)}
        </Tabs>
        </Col></Row>
        
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