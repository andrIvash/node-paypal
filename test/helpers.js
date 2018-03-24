const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

global.server = server;
global.expect = expect;
global.request = chai.request(server);
