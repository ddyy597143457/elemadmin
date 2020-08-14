const Mock = require('mockjs')
Mock.mock('/menu/list','get',require('./json/menu'));
Mock.mock('/video/upload','post',require('./json/uploadVideo'));