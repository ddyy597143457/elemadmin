const Mock = require('mockjs')
Mock.mock('/node/list','get',require('./json/nodeList'));
Mock.mock('/video/list','get',require('./json/videoList'));
Mock.mock('/video/add','post',require('./json/addVideo'));
Mock.mock('/video/edit','post',require('./json/editVideo'));