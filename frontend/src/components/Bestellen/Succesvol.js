import React, {useState, useEffect}from 'react';
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
const Succesvol = (props) => {

    const [ order, setOrder ] = useState([]);
    const [ Betaling, setBetaling ] = useState([]);
    const [ kaartjes, setKaartjes] = useState([]);
  

    const navigate = useNavigate();
    useEffect(() => {
        
      async function fetchData(){

          const response = await fetch('http://api.localhost/api/Order/By/'+localStorage.getItem("bnr"));
          const response2 = await fetch('http://api.localhost/api/Betaling/'+localStorage.getItem("bnr"));
          const data = await response.json();
          const data2 = await response2.json();
          setOrder(data);
          setBetaling(data2);
          setKaartjes(data["kaart"]);
          localStorage.setItem("pid",null)
        }
        fetchData().catch(err => {
          console.error();
          })
      },[] )
    
    if(order !== null){
      return(
        <div>
            <h1>Order: {order["betalingNr"]}</h1>
            <h1>Betaling is {Betaling["succes"] === "false"?"mislukt":"succesvol"}</h1>
            <h1>Kaartjes: {kaartjes}</h1>
            
            {Betaling["succes"] !== "false" &&
            <div>
              <h1>Kaartjes verstuurd naar: {"email"}</h1>
              {(JSON.stringify(kaartjes).replace(/"/g, "").split(',')).map((Number, index) => (
                <div className='qrcode' key={index}>
                  <div className='item'>{Number}</div>
                 <QRCode
                  title="qr"
                  value={Number}
                  size={100}
                  />
                  </div>
                ))}
               
            </div>
            
            }
           
        </div>
    )
    }else{
  
      navigate("/ProgrammaLijst");
    }
    

}

export default Succesvol;