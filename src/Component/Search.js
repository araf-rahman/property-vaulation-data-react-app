  import React, { Component } from "react";
  import {Table, Button} from 'react-bootstrap'

  class Search extends Component {
      state = {
        searchValue: "",
        data: [],
      };
    
      handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
      };
    
      handleSearch = () => {
        this.getPropertyInfo(this.state.searchValue);
      };
    // TODO: Utilize .env package to hide api key
      getPropertyInfo = searchInput => {
        var searchUrl = `https://data.cityofnewyork.us/resource/8y4t-faws.json?$$app_token=4Yj9vNOcp0lchNaAOG6JdfbT5&$q=${searchInput}&$order=year DESC`;
        fetch(searchUrl)
          .then(response => {
            return response.json();
          })
          .then(jsonData => {
            this.setState({ taxInfo: jsonData });
          });
      };
    // TODO: Convert this to fragrament 
      render() {
        return (
          <div id="main">
            <h1 className= "header">NYC Property Valuation and Assessment Info</h1>
            <input
              name="text"
              type="text"
              placeholder="Search"
              className = "inputbox"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <Button variant="primary" onClick={this.handleSearch}>Search</Button>
            
            {this.state.taxInfo ? (
                <Table responsive size="sm" className="table-bordered">
                  <thead>
                    <tr>
                      <th>Owner</th>
                      <th>Property Address</th>
                      <th>ZipCode</th>
                      <th>Tax Year</th>
                      <th>Current Year Final Market Value</th>
                      <th>Current Year Taxable Value Value</th>
                      <th>Prior Year Final Market Value</th>
                      <th>Prior Year Taxable Value Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.taxInfo.map((data, index) => (
                      <tr key={index}> 
                        <td>{data.owner}</td>
                        <td>{data.housenum_hi} {data.street_name}</td>
                        <td>{data.zip_code}</td>
                        <td>{data.year}</td>
                        <td>${data.finmkttot}</td>
                        <td>${data.fintrntot}</td>
                        <td>${data.pymkttot}</td>
                        <td>${data.pytxbtot}</td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
            ) : (
            
              <p className="text-muted" >Enter Property Address(Street number and name) to get more info</p>
            )}
          </div>
        );
      }
    }
    
    export default Search;