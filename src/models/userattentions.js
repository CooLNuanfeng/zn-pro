import AV from '../utils/av-weapp-min.js';

export default class UserAttentions extends AV.Object{
    constructor(){
        super()
    }
}

AV.Object.register(UserAttentions,'UserAttentions');
