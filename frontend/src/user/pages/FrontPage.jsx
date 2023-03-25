import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
//import MedicalBG from "./Meditech.png";
import PageBG from "../../BG1.jpg";
import PageBG2 from "../../BG2.jpg";
import PageBG3 from "../../BG3.jpg";
import Row from "react-bootstrap/Row";
import {Footer} from "../components/Footer";
import Image from "react-bootstrap/Image";
import '../../css/FrontPage.css'
//import DoctorFP from "./DoctorFP.jpeg";
//import DatebaseFP from "./DatabaseFP.jpeg";
//import "./css/FrontPage.css";
import Animation from "../../Animation";
import Fade from "react-reveal/Fade";
import { Carousel } from "react-bootstrap";

export const FrontPage = () => {
    return (
        <div className="FPMainDiv">
            <div style={{ minHeight: "80vh" }}>
                <div className="carousel">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 imgcarousel"
                                src={PageBG}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 imgcarousel"
                                src={PageBG2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 imgcarousel"
                                src={PageBG3}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Card className="FPMainCard">
                    {/* <h1>Hello</h1> */}
                    <Row>
                        <Col
                            sm={4}
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <Fade left>
                                <div className="FPNumberingCards">
                                    <br />
                                    <i
                                        className="fas fa-hospital fa-3x"
                                        id="icon"
                                    ></i>
                                    <h3 className="FPIconText">
                                        <br />
                                        <Animation numbering={100} />
                                        Doctors registered
                                    </h3>
                                </div>
                            </Fade>
                        </Col>
                        <Col
                            sm={4}
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                            }}
                        >
                            <Fade top>
                                <div className="FPNumberingCards">
                                    <br />
                                    <i
                                        className="fas fa-user fa-3x"
                                        id="icon"
                                    ></i>
                                    <h3 className="FPIconText">
                                        <br />
                                        <Animation numbering={100} />
                                        Users registered
                                    </h3>
                                </div>
                            </Fade>
                        </Col>
                        <Col
                            sm={4}
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                            }}
                        >
                            <Fade right>
                                <div className="FPNumberingCards">
                                    <br />
                                    <i
                                        className="fas fa-user-md fa-3x"
                                        id="icon"
                                    ></i>
                                    <h3 className="FPIconText">
                                        <br />
                                        <Animation numbering={100} />
                                        Drivers registered
                                    </h3>
                                </div>
                            </Fade>
                        </Col>
                    </Row>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Card>

                <div className="FPAboutUs">
                    <Row>
                        <Col sm={4}>
                            <Fade left>
                                <Image
                                    //src={DoctorFP}
                                    fluid
                                    rounded
                                    className="FPAboutUsImage"
                                />
                            </Fade>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={7}>
                            <Fade right>
                                <font className="FPAboutUsHeading">
                                    COOK-BOX
                                </font>
                                <hr className="AboutUs" />
                                <p className="FPAboutUsText">
                                Our goal is to enhance our users' productivity by alleviating their stress and providing them with a fulfilling hobby. In addition, we offer a range of services that cater to their wellness needs, including access to recipes and consultations with expert doctors.
                                </p>
                            </Fade>
                        </Col>
                    </Row>
                </div>

                <div className="FPFeatures">
                    <div className="FPFeaturesHeading">Our Features</div>
                    <hr className="Features" />

                    <div className="FPFeaturesCard">
                        <Row>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade left>
                                    <i
                                        className="fas fa-heartbeat fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />
                                <Fade right>
                                    <font className="FPFeaturesText">
                                    With the "search by tag" feature, content can be organized into specific categories or topics. This makes it easier for users to find the information they need quickly and efficiently, without having to sift through irrelevant content.  By making it easier for users to find the content they're looking for, the "search by tag" feature can improve the overall user experience. This can lead to higher engagement and increased satisfaction with the platform or website. Tagging content with specific keywords or topics can help marketers better understand their audience and tailor their messaging to their interests. 
                                    </font>
                                    <br />
                                    <br />
                                    <br />
                                </Fade>
                            </Col>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade top>
                                    <i
                                        className="fas fa-bacteria fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />

                                <Fade right>
                                    <font className="FPFeaturesText">
                                        You can book your "appointment with doctor", where patients are able to communicate directly with their doctor, they may feel more engaged in their own healthcare and more invested in the outcome of their treatment. This can lead to better adherence to treatment plans and improved outcomes. Doctor counseling can be done remotely, which can increase access to healthcare for patients who may not be able to travel to a physical appointment. This can be especially important for patients with mobility issues or those who live in rural areas.
                                        </font>
                                    <br />
                                    <br />
                                    <br />
                                </Fade>
                            </Col>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade right>
                                    <i
                                        className="fas fa-prescription fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />

                                <Fade right>
                                    <font className="FPFeaturesText">
                                        You can "order a recipe" which you can cook at your home. When cooking at home, you have control over the ingredients and can choose healthier options, such as fresh fruits and vegetables, lean protein, and whole grains. This can help you create healthier meals that are lower in calories, saturated fats, and sodium. Cooking at home can also be a fun and bonding activity for families. It provides an opportunity to work together, try new recipes, and share meals together, which can strengthen relationships and create lasting memories.
                                        </font>
                                </Fade>
                            </Col>
                        </Row>
                        <div style={{ height: "4rem" }}></div>
                        <Row>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade left>
                                    <i
                                        className="fas fa-stethoscope fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />
                                <Fade right>
                                    <font className="FPFeaturesText">
                                        "Delivery at your home".  A delivery system can make products or services more accessible to customers who might not otherwise be able to access them due to geographic or mobility limitations. A delivery system can provide convenience for customers by delivering products or services directly to their doorstep, saving them time and effort.
                                        </font>
                                    <br />
                                    <br />
                                    <br />
                                </Fade>
                            </Col>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade bottom>
                                    <i
                                        className="fas fa-file-medical fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />

                                <Fade right>
                                    <font className="FPFeaturesText">
                                      You can "rate as you want" on the last orders.  Positive ratings and reviews can be used as a marketing tool to attract new customers and promote the business's products or services. A rating or review system can increase transparency by providing customers with information about a business's products or services, including the quality of the products and the level of customer service.
                                      </font>
                                    <br />
                                    <br />
                                    <br />
                                </Fade>
                            </Col>
                            <Col sm={4} className="FPFeaturesColumm">
                                <Fade right>
                                    <i
                                        className="fas fa-search fa-3x"
                                        id="iconFeatures"
                                    ></i>
                                </Fade>
                                <br />
                                <br />
                                <Fade right>
                                    <font className="FPFeaturesText">
                                    With the "Contact Us Anytime" feature, customers can easily report issues or problems they may be experiencing, allowing the business to respond quickly and resolve any issues in a timely manner. Offering this feature can also provide a competitive advantage for businesses by differentiating them from competitors who may not offer such a feature.
                                      </font>
                                </Fade>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};
