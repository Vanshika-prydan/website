import validator from 'validator';
import { IAccount } from '../../../entities/Account';

const forgottenPasswordEmail = (account:IAccount, code:string) => `
<div style="line-height: 19px;
    margin-top: -3px;
    text-align: center;
    font-family: Omnes;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: rgba(58,82,103,1);
    letter-spacing: 0.2px;">
    <span>Hej ${validator.escape(account.firstName)}!</span>
    <br />
</div>
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
    <span>
        Din begäran om ändrat lösenord har anlänt och du kan fortsätta bytet genom att ange koden <strong>${code}</strong> i appen. Koden är giltig i två timmar.            
    </span>
</div>    
`;
export default forgottenPasswordEmail;
