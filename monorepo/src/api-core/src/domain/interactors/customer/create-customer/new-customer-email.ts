
const newCustomerEmail = (email:string, password:string) => `
        <div style="line-height: 19px;
        margin-top: -3px;
        text-align: center;
        font-family: Omnes;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: rgba(58,82,103,1);
        letter-spacing: 0.2px;">
            <span>Välkommen till We Clean Green!<br><br>Vad kul att du valt att bli kund hos oss! <br>Vi ser fram emot att få städa ditt hem och göra det skinande rent. Något vi är extra stolta över är att alla rengöringsmedel vi använder oss utav är miljövänliga och därmed inte skadar vår gröna natur. <br><br>Tack för att du väljer ett hållbarare städalternativ. </span>
        </div>
        <div style="
        padding:30px;
        margin:40px 0;
        background-color:rgba(69, 124, 56, 0.1);
        border-radius: 20px;
        ">

        <div 
        style="line-height: 20px;
        text-align: center;
        font-family: Omnes;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: rgba(58,82,103,1);
        letter-spacing: 0.2px;
        
        ">
            <span>Här är ditt lösenord och du kan uppdatera det i appen till ett eget.</span>
        </div>
        <div style="margin:10px 0 0px 0; font-size: 13px;">
            <span>Ditt användarnamn: </span><span style="font-style:normal;font-weight:bold;">${email}</span><br><span>Lösenord:</span><span style="font-style:normal;font-weight:bold;"> ${password}</span>
        </div>
    </div>

       
`;
export default newCustomerEmail;
