import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

const Documents=[
    {
        docName:"Passport",
        expiry:"29-07-2018",
        attachment:"View Document"
    },
    {
        docName:"Medical Insurance",
        expiry:"20-07-2018",
        attachment:""
    },
    {
        docName:"Medical Fitness Certificate",
        expiry:"29-07-2018",
        attachment:""
    },
    {
        docName:"Sea ferers Identity Book",
        expiry:"10-07-2018",
        attachment:""
    },
    {
        docName:"Professional Indeminity Insurance",
        expiry:"29-07-2018",
        attachment:""
    },
    {
        docName:"Qualification Document",
        expiry:"01-07-2018",
        attachment:"View Document"
    },
    {
        docName:"Competency Document",
        expiry:"29-07-2018",
        attachment:""
    }
]
export default class DocumentsPage extends Component {

  render() {
	return (
          <div className="col-md-8 fr">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3">
                        <span>Document Name</span>
                        <span className="exp_align">Expiry</span>
                        <span>File Attachment</span>
                    </div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow doc-minheight">
                    <table className="table borderless">
                        <tbody>
                            {
                                Documents.map((document, key)=>{
                                    return <tr>
                                        <td>{document.docName}</td>
                                        <td className="pl-0">{document.expiry}</td>
                                        {
                                            (document.attachment=="")?(
                                                <td className="pl-0">
                                                    <div className="progress progress_align">
                                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                </td>
                                            ):(
                                                <td className="pl-0 p-top-edit">{document.attachment}</td>
                                            )
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}