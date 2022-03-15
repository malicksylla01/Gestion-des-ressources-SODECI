import {Router} from 'express';
import { routeDecorator } from './route.decorators';
import { cdg } from '../utils';
import { LoggerHelper } from '../helpers';
import { MainController } from '../http/controllers';
import { JwtMiddleware, ValidatorMiddleware, MulterMiddleware } from '../http/middlewares';
import {body} from 'express-validator';
import { MainSet } from '../models';

const route = Router();

interface File {
    path: string,
    mimetype: string,
}

route.get('/test', 
    MulterMiddleware.single,
    async(req:any, res: any) => {
        let Q = new Promise(async(resolve, reject)=>{
            const test = ('http://www.w3.org/TR/PNG/iso_8859-1.txt');
            
            resolve({
                status: 201,
                message: 'TESTZONE',
                data: test
            });
        })
    return cdg.api(res, Q);
});
route.get('/container', (req:any, res: any) => {
    let Q = new Promise((resolve, reject)=>{
        
        resolve({
            status: 201,
            message: 'Welcome',
            data: 'Lorem ipsum dolor sit amet'
        });
    })
    return cdg.api(res, Q);
});
route.post('/generate',
    MulterMiddleware.single,
    body("apikey").not().isEmpty().withMessage('Clé de vérifiction requise'),
    ValidatorMiddleware.validate,
    
    (req: any, res: any) => {
        const body = req.body

        let Q = MainController.save(body)

        return cdg.api(res, Q);
});

route.delete('/remove/:slug',
    JwtMiddleware.checkToken,
    
    (req: any, res: any) => {
        const params = req.params;

        let Q = MainController.remove(params)
        return cdg.api(res, Q);
});
route.get('/select/:payload?',
    JwtMiddleware.checkToken,
    
    (req: any, res: any) => {
        const payload = req.params.payload;
        
        let Q = MainController.select(payload)
        return cdg.api(res, Q);
});

export class UserRoute {
    @routeDecorator(route) 
    static router: any;
    constructor() { }
}