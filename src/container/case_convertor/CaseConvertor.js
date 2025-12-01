import React, {useState} from 'react';
import  Toast from '../reusable/Toast';  
import Button from '@mui/material/Button';

function CaseConvertor() {
  console.log('Case Convertor Render');

  //   const themeMode = useSelector((state) => state.theme.value);

  const [input_text, setInputText] = useState('');

  const [toastrenderStatus, settoastrenderStatus] = useState({status: false, message: 'A', type: 'success'});

  const [charcountState, setcharcountState] = useState(0);
  const [linecountState, setlinecountState] = useState(0);

  //Handle input text change    
  const handleInputTextChange = (e) => {
    setInputText(e.target.value);

    const charInfo = e.target.value.split('');
    let charLength = 0;
    charInfo.forEach(char => {
        if(char !== ' '){
            charLength++;
        }
    });

    let lineLength = 1;
    charInfo.forEach(char => {
        if(char === '\n'){
            lineLength++;
        }
    });
        
    setcharcountState(charLength);

    setlinecountState(lineLength);

    if(e.target.value.length === 0){ setlinecountState(0); }
  }

  //Lower Case 
  const lowerCase = (e) => {
    setInputText(input_text.toLowerCase());

    if(input_text.length === 0){ return false; }

    settoastrenderStatus({status: true, message: 'Sucessfully converted to LowerCase', type: 'success'});
  }

  //Upper Case 
  const upperCase = (e) => {
    setInputText(input_text.toUpperCase());

    if(input_text.length === 0){ return false; }
    settoastrenderStatus({status: true, message: 'Sucessfully converted to UpperCase', type: 'success'});
  }

  //Capitalize Case 
  const capitalizeCase = (e) => {

    setInputText(input_text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

    if(input_text.length === 0){ return false; }

    settoastrenderStatus({status: true, message: 'Sucessfully converted to Capitalize Case', type: 'success'});
  }

   //Clear Input Text
   const clearCase = (e) => {
        setInputText('');

    if(input_text.length === 0){ return false; }

    setcharcountState(0);

    setlinecountState(0);

    settoastrenderStatus({status: true, message: 'Text Cleared', type: 'success'});
   }

   // copy text to clipboard
   const copytoclipboardCase = (e) => {
       navigator.clipboard.writeText(input_text);

       if(input_text.length === 0){ return false; }

       settoastrenderStatus({status: true, message: 'Text Copied', type: 'success'});
   }

   //copy text to alternate Case
   const alternatingCase = (e) => {
    setInputText(input_text.toLowerCase().split('').map((letter, index) => index % 2 === 0 ? letter.toLowerCase() : letter.toUpperCase()).join(''));

    if(input_text.length === 0){ return false; }

    settoastrenderStatus({status: true, message: 'Sucessfully converted to Alternate Case', type: 'success'});
   }

   //Title Case
    const titleCase = (e) => {
        setInputText(input_text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

        if(input_text.length === 0){ return false; }

        settoastrenderStatus({status: true, message: 'Sucessfully converted to Title Case', type: 'success'});
    }
   
    //Inverse Case
    const inverseCase = (e) => {
        setInputText(input_text.split('').map(letter => letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase()).join(''));

        if(input_text.length === 0){ return false; }

        settoastrenderStatus({status: true, message: 'Sucessfully converted to Inverse Case', type: 'success'});
    }

    //Download Case
    const downloadCase = (e) => {
        if(input_text.length === 0){ return false; }

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(input_text));
        element.setAttribute('download', 'mytext.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        settoastrenderStatus({status: true, message: 'File Ready for Download', type: 'success'});
    }

    const removeextraSpaceCase = (e) => {
        setInputText(input_text.replace(/\s+/g, ' '));

        if(input_text.length === 0){ return false; }

        setlinecountState(1);

        settoastrenderStatus({status: true, message: 'Sucessfully Remove Extra Space', type: 'success'});
    }

   return <>

  <div className="container" > 
        <div className='row'>
            <div className='col-md-10 mb-2 mt-4' style={{textAlign:'center'}}>
                <h4>Case Converter is a simple free online tool that converts any text.</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-md-6  offset-md-1'>
                <p>Simply enter your text and choose the case you want to convert it to.</p>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="9" onChange={handleInputTextChange} value={input_text}></textarea>
            </div>      

            <div className='col-md-2 mt-5'>
                <Button variant="contained"  sx={{marginBottom: 1, textTransform: 'none', width: 1}}  
                onClick={lowerCase} >lower case</Button>
                
                <Button  variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={upperCase} >UPPER CASE</Button>
                
                <Button  variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={capitalizeCase} >Capitalized Case</Button>

                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={alternatingCase} >aLtErNaTiNg cAsE</Button>
                
                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={titleCase} >Title Case</Button>
            </div>

            <div className='col-md-2 mt-5'>
                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={inverseCase} >InVeRsE CaSe</Button>

                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={removeextraSpaceCase} >Remove Extra Space</Button>

                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={downloadCase} >Download Text</Button>
                
                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}}
                onClick={copytoclipboardCase} >Copy to Clipboard</Button>

                <Button variant="contained" sx={{marginBottom: 1, textTransform: 'none', width: 1}} 
                onClick={clearCase} >Clear</Button>
            </div>

        </div>

        <div className='row mt-2'>

            <div className='col-md-6  offset-md-1'>
                <p>Character Count: {charcountState} | Word Count: 0 | Line Count: {linecountState}</p>
            </div>  

        </div>


        <div className='row'>
            <div className='col-md-10 mb-2 mt-4' style={{textAlign:'center'}}>
                {/* <h5 className='text-danger'>FEATURES : CASE CONVERTOR APP, GOOGLE LOGIN </h5> */}
            </div>
        </div>

    </div>


    {toastrenderStatus.status && <Toast data_props = {toastrenderStatus} /> }  

  </>;
}

export default CaseConvertor;
