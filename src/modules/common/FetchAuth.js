
/**
*  Wrapped fetch api to add access token to header
 *  and
 *  Load login page to login again
* */
function fetchAuth(url, args){
    const apiKey = localStorage.getItem("access_token");
    if(args && args.headers){
        args.headers.Authorization = `Bearer ${apiKey}`;
    } else if (args){
        args.headers = {Authorization: `Bearer ${apiKey}`}
    }
    let res = fetch(url, args);

    res.then( response =>{
       if(response.status === 401){
           localStorage.removeItem("user");
           window.location.reload();
       }
    });

    res.catch(e=>{
        if(e.status === 401){
            localStorage.removeItem("user");
            window.location.reload();
        }
    });
    return res;
}


export default fetchAuth;

