import AV from '../utils/av-weapp-min.js';

export default class UserInfo extends AV.Object{
    constructor(){
        super()
    }
}

AV.Object.register(UserInfo,'UserInfo');
