import { IBooking } from '../../../entities/Booking';
import PriceService from '../../../services/price-service';

const priceService = new PriceService();

/* eslint-disable no-tabs */
const failedPaymentEmail = async (booking:IBooking) => {
  const chargeableAmountInOre = await (priceService.calculateChargeableAmount(booking));
  return `
        <div style="line-height: 19px;
        margin-top: -3px;
        text-align: center;
        font-family: Omnes;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: rgba(58,82,103,1);
        letter-spacing: 0.2px;">
            <span><p>Hej ${booking.customer.account.firstName}<br></p>
                <p>Tyvärr gick inte betalningen igenom.</p>
                <p>Se över dina betlaningsmetoder i We Clean Green appen.
                    <br>Vi kommer att försöka dra pengar vid ett senare tillfälle.</p>
                    <p>

                        Vid frågor, ta gärna kontakt med oss.
                    </p>

                </p>
        </div>
        <div style="
        padding:30px;
        margin:40px 0;
        background-color:rgba(69, 124, 56, 0.1);
        border-radius: 20px;
        ">

        <div>
           

            <table style="flex: 1; justify-self:center; width:80%; border-collapse:collapse; margin-left: auto; margin-right: auto;" >
                <thead>
                    <tr style="border-bottom: 1px solid rgba(58,82,103,0.3)">
                        <th style="text-align: left;">Totalsumma</th>
                        <th style="text-align: right;">${chargeableAmountInOre / 100} kr</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: left;">Varav moms (20%)</td>
                        <td style="text-align: right;"> ${0.2 * chargeableAmountInOre / 100} kr</td>
                    </tr>

                    <tr>
                        <td style="text-align: left;">RUT-avdrag</td>
                        <td style="text-align: right;">- ${chargeableAmountInOre / 100} kr</td>
                    </tr>

                </tbody>
            </table>

        </div>

      
    </div>

     

`;
};
export default failedPaymentEmail;
