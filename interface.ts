interface CampItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
  interface CampJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CampItem[]
  }

interface BookingItem {
    nameLastname: string;
    tel: string;
    camp: string;
    bookDate: string;
  }