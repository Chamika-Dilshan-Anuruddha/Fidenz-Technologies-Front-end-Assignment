import React from 'react'
import './SingleHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';


export default function SingleHeader() {
  return (
    <div>
        <div className='sparentEnterCity'>
                    <div className='stopic'>
                        <FontAwesomeIcon className='sicon' icon={faCloudMoonRain} />
                        <p className='sweatherTopic'>Weather App</p>
                    </div>       
                    
                </div>
      
    </div>
  )
}
