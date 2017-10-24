import React,{ Component }  from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
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
  <Container fluid>
    <Row>
      <Col size="md-12">
        
          <h2>Welcome to ACME Inc. Resume Database</h2>
            <section className="picture"></section> 
        
      </Col>
    </Row>
  </Container>;

export default Home;