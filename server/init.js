const axios = require('axios')
const { nodeport, ip, port, prefix, baseurl, name, password, login, search_url } = require('./config');
const md5 = require('md5');
const co = require('co');
let obj = {};

class Yitutech{
  constructor(){
    this.logintime = 0
    this.baseURL = baseURL
    this.name = name
    this.password = md5(password)
    this.login = login
    this.islogin = false
    this.session_id = ""
    this.headers = {
      "Access-Control-Request-Headers":"authorization",
      "Access-Control-Request-Method": "POST",
      "Origin":"http://192.168.10.142:9099",
      "Referer":"http://192.168.10.142:9099/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3493.3 Safari/537.36"
  }
    this.login()
  }
  login(){
    if(Date.now() - this.logintime > 14 * 60){
      console.log('未连接或连接超时,开始连接');
      co(function *(){
        const _d = axios.post(`${this.baseurl}${this.login}`, {
            name: this.name,
            password: this.password
          })
        if(_d.status === 200){
          this.logintime = Date.now();
          // 把session给赋值上去
          this.session_id = _d.data.session_id;
        }
      })
    }else{
      console.log('已登录')
    }
  }
  search(){
    // 如果需要session的话
    // login()
    // {
    //       "extra_fields": ["custom_field_1"],
    //       "condition": {
    //           "repository_ids": ["3"]
    //       },
    //       "order": {
    //           "timestamp": -1
    //       },
    //       "start": 0,
    //       "limit": 1
    //   }
    axios.request({
      url: `${this.baseURL}${search_url}`,
      method: "post",
      headers: {
        Cookie: `${cook.slice(0, cook.indexOf(' Path'))} user=${encodeURIComponent(JSON.stringify(_d.data.data))}`,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      },
      data: {
        condition: '',
        order: {
          timestamp: -1
        },
        start: 0,
        limit: 1
      }
    }).then(_d => {

    }).catch(err => {

    })
  }
}

// console.log(123);
// co(function *(){
//   var data = yield axios.get('http://192.168.10.109:8080/comparison/rest/group/search?userid=plattest&params={%22groupname%22:%22%22,%22startindex%22:%221%22,%22pagesize%22:%2210%22}')
//   console.log(data);
//   console.log(456);
//   var data1 = yield axios.get('http://192.168.10.109:8080/comparison/rest/table/existtable?userid=platadmin&params={%22startindex%22:%221%22,%22pagesize%22:%2212%22,%22createdtorder%22:%221%22}');
//   console.log(data1);
//   console.log(789)
// })

// console.log(10,11,12)

		// // 给对面 query获取
		// params:{
		// 	linbin: 'llllll1112'
		// },
		// // 给对面body获取
		// data: {
		// 	firstbinbin: 'bbbbbb'
		// }