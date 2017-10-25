import React,{ Component }  from "react";
import { Col, Row, Container } from "../../components/Grid";


import animatdiv from "../../components/Section";
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
const Home = () =>
  <Container >
    <Row>
      <Col size="md-12">
        <div className="text-info">
          <h2>Welcome to ACME Inc</h2>
          <Container >
          <Row>
            <Col size="md-8">
            <section className="wrapper text-info" >
             <p> ACME is the leading provider of professional staffing services in the Washington DC area. We place top Technology, Finance & Accounting, Sales & Marketing, Recruiting & HR and Administrative professionals with the area’s best employers. Our diverse client base represents a wide range of industries, including technology and media, financial services, professional services, energy & green technology, federal services, education and non-profit organizations.</p></section>
            </Col>
            <br/>
            <Col size="md-4">
            <img className="picture" src={require('../../img/one.jpg')} />
            </Col>  
           </Row>
            </Container>
        </div>
      </Col>
    </Row>
  </Container>;

export default Home;