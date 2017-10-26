import React,{ Component }  from "react";
import { Col, Row, Container } from "../../components/Grid";
import {bounce} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
//import animatdiv from "../../components/Section";
import "./Home.css"

// import Background from '../../img/websites-modern.jpg';

// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: "url(" + { Background } + ")"
// };

// class Home extends Component {
//   render() {
//     return (
//       <section style={ sectionStyle }>
//       <img />
//       <h2>Welcome to ACME Inc. Resume Database</h2>
//       </section>
//     );
//   }
//}
const styles = {
  bounce: {
    animation: 'x 3s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
}
const Home = () =>
  <Container>
    <Row>
      <Col size="md-12">
        <div className="text-info">
          <h2>Welcome to ACME Inc</h2>
          <StyleRoot>
          <Container className="wrapper"  style={styles.bounce}>
          <Row>
            <Col size="md-3">
             <img className="picturetwo" src={require('../../img/Professional-Services.jpg')} />
            </Col>  
            <Col size="md-8">
           
             <p> ACME is the leading provider of professional staffing services in the Washington DC area. We place top Technology, Finance & Accounting, Sales & Marketing, Recruiting & HR and Administrative professionals with the area’s best employers. Our diverse client base represents a wide range of industries, including technology and media, financial services, professional services, energy & green technology, federal services, education and non-profit organizations.</p>
            </Col>
            <br/>
            
           </Row>
            </Container>
            </StyleRoot>
            <br/>
            <br/>
          <StyleRoot>
          <Container className="wrapper"  style={styles.bounce}>
          <Row>
            
            <Col size="md-8">
           
             <p> ACME is the leading provider of professional staffing services in the Washington DC area. We place top Technology, Finance & Accounting, Sales & Marketing, Recruiting & HR and Administrative professionals with the area’s best employers. Our diverse client base represents a wide range of industries, including technology and media, financial services, professional services, energy & green technology, federal services, education and non-profit organizations.</p>
            </Col>
            <Col size="md-3">
             <img className="picturetwo" src={require('../../img/earthhead.jpg')} />
            </Col>  
            <br/>
            
           </Row>
            </Container>
            </StyleRoot>  
        </div>
      </Col>
    </Row>
  </Container>;

export default Home;