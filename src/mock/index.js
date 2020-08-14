const Mock = require('mockjs')
Mock.mock('/menu/list','get',require('./json/menuList'));
Mock.mock('/video/list','get',require('./json/videoList'));
Mock.mock('/video/add','post',require('./json/addVideo'));
Mock.mock('/video/edit','post',require('./json/editVideo'));