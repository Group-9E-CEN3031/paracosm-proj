var should = require('should');
const axios = require('axios');

const BASE_URL = 'https://localhost:3000';

describe('Testing if requests to each page have a response', function() {

    // Make sure each page responds to the user
    it('home page should respond', function(done) {
        axios.get(BASE_URL + '/Home')
            .then(res => {
                should.exist(res);
                should.not.exist(res.err);
            });

        done();
    });

    it('upload page should respond', function(done) {
        axios.get(BASE_URL + '/Upload')
            .then(res => {
                should.exist(res);
                should.not.exist(res.err);
            });

        done();
    });

    it('download page should respond', function(done) {
        axios.get(BASE_URL + '/Download')
            .then(res => {
                should.exist(res);
                should.not.exist(res.err);
            });

        done();
    });

    it('register page should respond', function(done) {
        axios.get(BASE_URL + '/Register')
            .then(res => {
                should.exist(res);
                should.not.exist(res.err);
            });

        done();
    });

    // All other pages result in 'Page not found'
    it('any other page should be not found', function(done) {
        axios.get(BASE_URL + '/fdaf')
            .then(res => {
                res.body.should.equal('Page not found');
            });

        done();
    });
});