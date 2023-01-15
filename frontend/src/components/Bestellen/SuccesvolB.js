// import React from 'react';
// import { useNavigate } from "react-router";
// import BetalingsForm from './BetalingsForm';

// var details = {
//     'amount':  25,
//     'reference': '31231231231',
//     'url': 'http://api.localhost/api/Betaling'
//   };

// var formBody = [];
// for (var property in details) {
// var encodedKey = encodeURIComponent(property);
// var encodedValue = encodeURIComponent(details[property]);
// formBody.push(encodedKey + "=" + encodedValue);
// }
// formBody = formBody.join("&");

// const SuccesvolB = ({ history }) => {
//   const navigate = useNavigate();
//   const handleOnSubmit = async (props) => {
//     await fetch('https://fakepay.azurewebsites.net/', {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//           },
//       body: formBody
//       }) 
//         .then(response => {
            
//         return response.text()
        
//       }).then(response => {
//         console.log(response)
//         return response
//       })
//     }

//   return (
//     <React.Fragment>
//       <BetalingsForm handleOnSubmit={handleOnSubmit} />
      
//     </React.Fragment>
//   );
// };

// export default SuccesvolB;