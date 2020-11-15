import React, { useState } from "react"
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap"
import listQuery from '../utilityfunctions/list-query';
import compare from '../utilityfunctions/compare';
import Layout from "../components/layout";
import ComboPanel from '../components/combo-panel';
import DrugInfo from '../components/drug-info';
import SEO from "../components/seo";
import { graphql } from 'gatsby';
import image from '../images/refresh-svgrepo-com.svg';
import Input from '../components/Form/Input';
import { CSSTransition } from 'react-transition-group';

const IndexPage = ({ data }) => {
  const drugs = data.allDataJson.edges[0].node.names;
  const fullInfo = data.allDataJson.edges[0].node.drugs;
  const [filteredList, setFilteredList] = useState([])
  const [selectedDrugs, setSelectedDrugs] = useState([])
  const [searchForm, updateSearchForm] = useState("")
  const [detailedInfo, setDetailedInfo] = useState(undefined)
  const [tableInView, setTableInView] = useState(false);

  const dataFetch = (array) => {
    const d1 = data.allDataJson.edges[0].node.drugs.find((obj) => obj.name === array[0])
    const d2 = data.allDataJson.edges[0].node.drugs.find((obj) => obj.name === array[1])
    setDetailedInfo(compare(d1, d2))
  }
  const handleInputChange = (e) => {
    updateSearchForm(e.target.value)
    setFilteredList(listQuery(drugs, e.target.value, undefined, fullInfo))
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  const handleListClick = (label) => {
    drugTouched(label)
  }
  const handleReset = () => {
    setFilteredList([])
    setSelectedDrugs([])
    updateSearchForm("")
    setDetailedInfo(undefined)
  }

  const drugTouched = (drugName) => {
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
setTableInView(false);
  }

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container className="text-center">
      {detailedInfo && <ComboPanel info={detailedInfo}/>}
      {selectedDrugs.length>0 && <div className="mb-3" id="refresh-box" onClick={triggerResetAnimation}><img id="refresh" src={image} width="15px"/><p className="m-0">{" Reset Search"}</p></div>}
      <Row>
        <Col xs={12}>
        <CSSTransition timeout={{exit:600, enter:0}} in={selectedDrugs && selectedDrugs.length < 2} unmountOnExit mountOnEnter>
          <form onSubmit={handleFormSubmit} className="mx-auto mb-5 mt-2" style={{ maxWidth: '500px', width: "100%" }}>
            <Input placeholder={selectedDrugs.length < 1 ? "I want to know about ..." : `How does this mix with ...`} onChange={handleInputChange} value={searchForm} />
            {filteredList.length > 0 && (<ul>
              {filteredList.map((el,i) => (<li key={`${el}${i}`} onClick={() => handleListClick(el)}>{el}</li>))}
            </ul>)}
          </form>
        </CSSTransition>
        </Col>
      </Row>
        
        <CSSTransition in={tableInView} timeout={600} onExited={handleReset}>
        <Row style={{boxShadow:"10px 10px 20px rgba(0,0,0,0.1)", marginBottom:'20px', borderRadius:"10px"}} id="DrugInfoContainer">
        <Col xs={12}>
        <Tabs defaultActiveKey="key1" activeKey={selectedDrugs.length===1 ? 'key1' : undefined} id="tabs">
          {selectedDrugs.length > 0 && (<Tab eventKey="key1" title={selectedDrugs[0]}>
          <DrugInfo drug={data.allDataJson.edges[0].node.drugs.find((el)=>el.name===selectedDrugs[0])}/>
          </Tab>)}
          {selectedDrugs.length > 1 && (<Tab eventKey="key2" title={selectedDrugs[1]}>
          <DrugInfo drug={data.allDataJson.edges[0].node.drugs.find((el)=>el.name===selectedDrugs[1])}/>
          </Tab>)}
        </Tabs>
        </Col></Row>
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