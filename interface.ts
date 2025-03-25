interface CampItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    region: string,
    __v: number,
    picture: string,
    id: string
  }
  
  interface CampJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CampItem[]
  }

interface BookingItem {
  campName: string;
  _id: string;
  nameLastname: string;
  tel: string;
  bookDate: string;
  camp: string;
  }