export const api_key ="AIzaSyDFrEeGv_oqZg0f9CHMT1QGa_MqUhNkDP0";


export const convert_data =(value) =>{

    if(value >= 100000)
    {
        return Math.floor((value/100000)) + "M";
    }
    else if(value>=1000)
    {
        return Math.floor((value/1000) )+ "K";
    }
    else
    {
        return value;
    }

}