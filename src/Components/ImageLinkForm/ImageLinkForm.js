import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className='f3 b white'>
                {'This Brain will detect faces in your pictures.'}
            </p>
            <div className='center'>
                <div className='imglinkform center pa4 br3 shadow-5 ma4'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onButtonSubmit}> Detect </button>
                </div>
            </div>
        </div>
        
    );
}

export default ImageLinkForm;