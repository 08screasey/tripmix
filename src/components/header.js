import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import HeaderImage from '../images/TripMix-Title.png'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#20232a`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0.25rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, padding:'0px' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img src={HeaderImage} alt="" height="100px"/>
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
