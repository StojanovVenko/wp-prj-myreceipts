// import React from "react";
// import Dropdown from "react-bootstrap/Dropdown";
// import {CustomMenuFirmi, CustomToggleFirmi} from "../../FirimDropdown/FirmiDropdown";
// import {CustomMenuProdavnici, CustomToggleProdavnici} from "../../ProdavniciDropdown/prodavniciDropdown";
// import FirmiService from "./../../../../../service/firmiService";
// import {withRouter} from "react-router";
// import {Link} from "react-router-dom";
//
// const FirmaStatistiki = (props) => {
//
//     const firmiDropdown = () => {
//         console.log("props");
//         console.log(props);
//         let firmiHtml = props.firmi.map((f, index) => {
//             return <Dropdown.Item eventKey={`${index}`}
//                                   onClick={(e) => {
//                                       props.changeFirma({f});
//                                   }}>
//                 {f.ime} - {f.grad.ime}
//             </Dropdown.Item>;
//         });
//
//         return <Dropdown>
//             <Dropdown.Toggle as={CustomToggleFirmi} id="dropdown-custom-components">
//                 {props.imeFirma} - {props.gradFirma}
//             </Dropdown.Toggle>
//             <Dropdown.Menu as={CustomMenuFirmi}>
//                 {firmiHtml}
//             </Dropdown.Menu>
//         </Dropdown>;
//     };
//
//     // const prodavniciDropdown = () => {
//     //     let init = <Dropdown.Item eventKey={`-1`} onClick={(e) => {
//     //         // this.onClickDropdown(this.state.idGrad, this.state.grad);
//     //     }}>сите продавници</Dropdown.Item>;
//     //
//     //     let prodavniciHtml = this.state.prodavnici.map((prodavnica, index) => {
//     //         return <Dropdown.Item eventKey={`${index}`} onClick={(e) => {
//     //             // this.onClickDropdown(e.target.attributes.getNamedItem('idgrad').value,
//     //             //     e.target.attributes.getNamedItem('imegrad').value,
//     //             //     e.target.attributes.getNamedItem('idprodavnica').value,
//     //             //     e.target.attributes.getNamedItem('imeprodavnica').value);
//     //         }}
//     //
//     //                               idprodavnica={prodavnica.idProdavnica}
//     //                               imeprodavnica={prodavnica.ime}
//     //                               idgrad={prodavnica.grad.idGrad}
//     //                               imegrad={prodavnica.grad.ime}
//     //                               idfirma={prodavnica.firma.idFirma}
//     //                               imefirma={prodavnica.firma.ime}>
//     //             {prodavnica.ime} - {prodavnica.grad.ime}
//     //         </Dropdown.Item>;
//     //     });
//     //
//     //     return <Dropdown>
//     //         <Dropdown.Toggle as={CustomToggleProdavnici} id="dropdown-custom-components">
//     //             {this.state.prodavnica}
//     //         </Dropdown.Toggle>
//     //         <Dropdown.Menu as={CustomMenuProdavnici}>
//     //             {init}
//     //             {prodavniciHtml}
//     //         </Dropdown.Menu>
//     //     </Dropdown>;
//     // };
//
//     return (<>
//         Статистики за
//         <span className="d-block">
//             {firmiDropdown()}
//             </span>
//         за
//         <span>
//                 {/*{prodavniciDropdown()}*/}
//             </span>
//     </>);
//
// };
//
// export default FirmaStatistiki;
