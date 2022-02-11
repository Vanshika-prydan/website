import { BookingFullyDefined } from '../../../entities/Booking';
import { sv } from 'date-fns/locale';
import { format } from 'date-fns';
import { Occurrence } from '../../../entities/Occurrence';
import { getHourlyPriceInclVATWithRUT, getPriceInclVAT, getPriceInclVATWithRUT, getTotalRutDeduction, getVAT } from '../../../services/price-service/price-utils';

const successfulPaymentEmail = (booking: BookingFullyDefined, receiptId: string):string => {
  const occurrence = booking.frameBooking?.occurrence ?? Occurrence.ONETIME;
  const durationInMinutes = ((booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60));
  const { startTime, endTime, address } = booking;
  const { account } = booking.customer;

  return `
        
       
<div style="
    padding:30px;
    margin:40px 0;
    background-color:rgba(69, 124, 56, 0.1);
    border-radius: 4px;
    ">

    <div style="font-weight: bold; font-size: 22px">KVITTO</div>

    <hr style="border-top: 2px solid rgba(163,198,151,1); margin: 30px 0" >

    <div class="textLeft receiptBoldText">${format(startTime, 'iiii do MMMM', { locale: sv })}</div>
    <div class="textLeft receiptNormalText">${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}</div>
    <br>
    <div class="textLeft receiptBoldText">${account.firstName} ${account.lastName}</div>
    <div class="textLeft receiptNormalText">${address.street}</div>
    <div class="textLeft receiptNormalText">${address.postalCode} ${address.postalCity}</div>

    <hr style="border-top: 2px solid rgba(163,198,151,1); margin: 30px 0 10px 0" >

    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptWeakText textLeft">Kvittonummer</div>
        <div>${receiptId}</div>
    </div>
    <br><br>
    
    <div class="textLeft receiptBoldText">${booking.bookingType.name}</div>
    <hr style="border-top: 0.5px solid rgba(163,198,151,1);" >

    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptNormalText">${getHourlyPriceInclVATWithRUT(occurrence)} kr</div>
        <div class="receiptNormalText">x ${(durationInMinutes / 60).toPrecision().toString()} timmar</div>
        <div class="receiptNormalText">${getPriceInclVATWithRUT(occurrence, durationInMinutes)} kr</div>
    </div>

    <hr style="border-top: 0.5px solid rgba(163,198,151,1);" >

    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptWeakText">Utan RUT-avdrag</div>
        <div class="receiptWeakText">${getPriceInclVAT(occurrence, durationInMinutes)} kr</div>
    </div>

    <br><br>
    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptBoldText">Totalsumma</div>
        <div class="receiptBoldText">${getPriceInclVATWithRUT(occurrence, durationInMinutes)} kr</div>
    </div>
    <hr style="border-top: 0.5px solid rgba(163,198,151,1);" >
    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptWeakText">Varav moms (20%)</div>
        <div class="receiptWeakText">${getVAT(occurrence, durationInMinutes)} kr</div>
    </div>
    <div style="display:flex; justify-content:space-between; flex-direction: row;"> 
        <div class="receiptWeakText">RUT-avdrag</div>
        <div class="receiptWeakText">- ${getTotalRutDeduction(occurrence, durationInMinutes)} kr</div>
    </div>

  

</div>


    `;
};
export default successfulPaymentEmail;
