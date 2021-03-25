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

    test('GET individual item fail', async function(){
        const resp = await request(app).get('/items/dirt');
        expect(resp.statusCode).toEqual(500);
        expect(resp.body).toEqual({"error": {"status": 500}});
    })

    test('PATCH individual item', async function() {
        const resp = await request(app).patch('/items/popsicle').send(
            {
                name: "new popsicle",
                price: 999
            }
        );
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({updated: {name: "new popsicle", price: 999}});
    })

    test('DELETE individual item', async function() {
        const resp = await request(app).delete('/items/popsicle')
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({message: "Deleted"});
    })

})