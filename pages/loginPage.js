import { Login } from '../locators/locators';
export class LoginPage{
    constructor(page){
        this.page=page;
        this.login=new Login(page);
        
    }
}