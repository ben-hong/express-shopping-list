const request = require('supertest');
const app = require('./app')


describe('#items api', () => {
    test('GET items', async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({items: [
            { name: "popsicle", price: 1.45 },
            { name: "cheerios", price: 3.40 }
        ]});
    })

    test('POST items', async function(){
        const resp = await request(app).post('/items')
                        .send({name: "popsicle", price: 1.45});
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({added: {name: "popsicle", price: 1.45}});
    })

    test('GET individual item', async function(){
        const resp = await request(app).get('/items/popsicle');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({name: "popsicle", "price": 1.45});
    })
})