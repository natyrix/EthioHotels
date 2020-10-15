import registerModel from "./models/registerModel";
import loginModel from "./models/loginModel";
import completeRegisterModel from "./models/completeRegisterModel";
import HotelModel from "./models/hotelModel";
import HelperModel from "./models/HelperModel";
import ReceptionistModel from "./models/ReceptionistModel";
const storeModel = {
    register: registerModel,
    completeRegister: completeRegisterModel,
    login: loginModel,
    hotel: HotelModel,
    helpers: HelperModel,
    rec: ReceptionistModel,
};

export default storeModel