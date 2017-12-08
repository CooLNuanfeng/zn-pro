import AV from '../utils/av-weapp-min.js';

export default class NewsList extends AV.Object{
    constructor(){
        super()
    }
    // set nickname(value){
    //     this.set('nickname',value)
    // }
    // get nickname(){
    //     this.get('nickname');
    // }
    //
    // set uid(value){
    //     this.set('uid',value)
    // }
    // get uid(){
    //     this.get('uid');
    // }
    //
    // set title(value){
    //     this.set('title',value)
    // }
    // get title(){
    //     this.get('title')
    // }
    //
    // set subtitle(value){
    //     this.set('subtitle',value)
    // }
    // get subtitle(){
    //     this.get('subtitle')
    // }
    //
    // set phone(value){
    //     this.set('phone',value)
    // }
    // get phone(){
    //     this.get('phone')
    // }
    //
    // set type(value){
    //     this.set('type',value);
    // }
    // get type(){
    //     this.get('type')
    // }
    //
    // set formdata(value){
    //     this.set('formdata',value);
    // }
    // get formdata(){
    //     this.get('formdata');
    // }
}

AV.Object.register(NewsList,'NewsList');
