import React, { useEffect, useState } from 'react';
import {getUur} from './utils.js';
import _ from 'lodash';
const Home = () => {
    const [ loading, setLoading ] = useState(true);
    const [ programmas, setProgramma ] = useState([]);
    const [iSlide, setISlide] = useState(1);
    
    const beweegRB = index => {
        setISlide(index)
    }

    useEffect(() => {
      async function fetchData(){
          const response = await fetch('http://api.localhost/api/Programma');
          const data = await response.json();
          setProgramma(data);
          setLoading(false);
      }
      fetchData()
    }, []);

    useEffect(() => {
        if(iSlide >= programmas.length+1) {
            setISlide(1);
        }
        const id = setInterval(() => setISlide(
            (oldCount) => oldCount + 1), 5000);
            
        return () => {
            clearInterval(id);
        };
      }, [iSlide,programmas.length]);
  
    const dateFormat = (date) =>{
        var d = new Date(date);
        return d.getDate() + ' - ' + (d.getMonth() +1) + ' - ' + d.getFullYear()
    }

 

    return loading ? "Laden..." : (
        <div className='c_slider'>
            <div>

            {!_.isEmpty(programmas) ? 
            (programmas.map((obj, index) => 
                (
                    <div key={index} 
                            className={iSlide === index + 1 ? "slide Actief-anim" : "slide"}
                            >
                        <div className='g_Titel' >
                            <h1 className='Seizoen'>WINTER</h1>
                            <div className='g_lijn'></div>
                            <div className='SeizoenT2'>Programma</div>
                            <div className='g_ProgTitel'>{obj.titel}</div>
                            <div className='g_lijn2'></div>
                            
                            <div className='g_datumBG' > 
                                <div className='g_dT'>{dateFormat(obj.van)}</div>
                                <div className='g_dT2' >
                                        {getUur(obj.van) + " - " + getUur(obj.tot)}</div>
                            </div>
                        </div>
                        
                      <img  src={process.env.PUBLIC_URL+ '/Afbeeldingen/'+obj.genre + '.jpg'} alt={obj.genre}
                              />
                    <div className='c_radiobox'>
                        {Array.from({length: 5}).map((item, index) => (
                            <div  key={index}  onClick={() => beweegRB(index + 1)}
                                className={iSlide === index + 1 ? "radiobox Actief" : "radiobox"}
                                ></div>
                            ))}
                    </div>
                    
                        </div>
                
                ))) : (
                    <p className="message">Er zijn nog geen programmas!</p>
                  )}
                
            </div>
          </div>
    
    );
        

}

export default Home;