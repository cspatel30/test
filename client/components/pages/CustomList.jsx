import React, { Component } from 'react';
import EnquiryContent from './EnquiryContent.jsx';
import ReactPaginate from "react-paginate";
import leftarrow from '../../images/left-arrow.svg';
import rightarrow from '../../images/right-arrow.svg';
import StatusEnquiry from './StatusEnquiry.jsx';

export default class CustomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          page: 1
        };
    }
    setContent(selection) {
        const { renderEnquiries, profileType, formatDate,selected } = this.props;
        switch (selection) {
          case "Manage Enquiries":
            return (
              <EnquiryContent 
               renderEnquiries={renderEnquiries} 
               profileType={profileType} 
               formatDate={formatDate} 
               page={this.state.page} 
               itemType ={selected}
               />           
            );
          case "Manage Orders":
            return (
             <StatusEnquiry                
              />
            
            );
            default:
            return (
                <EnquiryContent 
                renderEnquiries={renderEnquiries} 
                profileType={profileType} 
                formatDate={formatDate} 
                page={this.state.page} 
                itemType ={selected}
                />
            );
        }
      }
    render() {
        const {selected,renderEnquiries} = this.props;
        const pageCount = Math.ceil(renderEnquiries.length / 2);
        return (
            <div>
             {this.setContent(selected)}   
             {pageCount > 1 &&
              <div className="pagination-outer-div">
                <ReactPaginate
                  initialPage={this.state.page - 1}
                  previousLabel={<img src={leftarrow} width="11px" height="13px" />}
                  nextLabel={<img src={rightarrow} width="11px" height="13px" />}
                  breakLabel={<span>...</span>}
                  breakClassName="break-me"
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={(page) => this.setState({ page: page.selected + 1 })}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="pagination active"
                />
              </div>
            }
          </div>      
          );
      }
    }
