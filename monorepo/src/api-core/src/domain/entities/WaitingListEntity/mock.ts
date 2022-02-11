import { WaitingListEntityInterface } from './';

export default class MockWaitingListEntity implements WaitingListEntityInterface {
   public readonly waitingListEntityId: string;
   public readonly email: string;
   public readonly postalCode: string;

   constructor (payload:Partial<WaitingListEntityInterface> = {}) {
     this.email = payload.email ?? 'niklas@cleangreen.se';
     this.postalCode = payload.postalCode ?? '11443';
     this.waitingListEntityId = payload.waitingListEntityId ?? '431f5bfb-a5d1-4f14-a2be-991123e5dcea';
     return this;
   }
}
