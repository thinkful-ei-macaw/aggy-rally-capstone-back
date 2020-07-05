process.env.TZ = 'UTC';

require('dotenv').config({silent: true});
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;