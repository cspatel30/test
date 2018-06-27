import React, { Component } from 'react';
import EnquiryContent from './enquiry/EnquiryContent.jsx';
import ReactPaginate from "react-paginate";
import leftarrow from '../../images/left-arrow.svg';
import rightarrow from '../../images/right-arrow.svg';
import OrderContent from './orders/OrderContent.jsx';
import './style/style.scss';

export default class CustomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          page: 1
        };
    }
    setContent(selection) {
        const { renderEnquiries, profileType, formatDate,selected,formatMonth } = this.props;
        switch (selection) {
          case "Manage Enquiries":
            return (
              <EnquiryContent 
               renderEnquiries={renderEnquiries} 
               profileType={profileType} 
               formatDate={formatDate}
               formatMonth={formatMonth} 
               page={this.state.page} 
               itemType ={selected}
               />           
            );
          case "Manage Orders":
            return (
              <OrderContent 
              renderEnquiries={renderEnquiries} 
              profileType={profileType} 
              formatDate={formatDate} 
              page={this.state.page} 
              itemType ={selected}
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
        const {selected,renderEnquiries,pageLength} = this.props;
        const pageCount = Math.ceil(pageLength / 2);
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
