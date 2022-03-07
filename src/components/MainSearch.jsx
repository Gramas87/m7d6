import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import JobResult from "./JobResult";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchJobs } from "../store/actions";
import {useDispatch} from "react-redux"
import {useState} from "react"

// const mapDispatchToProps = (dispatch) => ({
//   fetchJobs: (baseEndpoint, query) => dispatch(fetchJobs(baseEndpoint, query)),
// });

const MainSearch = () => {
  const dispatch = useDispatch()

  const [query, setQuery] = useState("")
  const [jobs, Setjobs] = useState([])

  // state = {
  //   query: "",
  //   jobs: [],
  // };

  
  // baseEndpoint = "https://strive-jobs-api.herokuapp.com/jobs?search=";
  // handleChange = (e) => {
  //   this.setState({ query: e.target.value });
  // };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(baseEndpoint, query);
  // };

  
    return (
      <Container>
        <Row>
          <Col xs={10} className="mx-auto my-3">
            <h1>Remote Jobs Search</h1>
            <Link to="/favourites" className="btn btn-primary">
              Favourites
            </Link>
          </Col>
          <Col xs={10} className="mx-auto">
            <Form onSubmit={dispatch(fetchJobs("https://strive-jobs-api.herokuapp.com/jobs?search=", query))}>
              <Form.Control
                type="search"
                value={query}
                onChange={setQuery}
                
                placeholder="type and press Enter"
              />
            </Form>
          </Col>
          <Col xs={10} className="mx-auto mb-5">
            {jobs.elements.map((jobData) => (
              <JobResult key={uniqid()} data={jobData} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  
}

export default MainSearch;
