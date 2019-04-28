export default {
  mainurl: 'https://zadai.net', // 全局接口地址
  loginUrl: '/apis/login', // 登录接口
  getUnionid:'/apis/getUnionid/', // 获取Unionid 
  localExpert: '/apis/websocket/localExpert', // 聊天获取当前用户
  useradd: '/apis/user/add', // 顾问申请
  londadd: '/apis/loan/apply', // 服务申请,添加服务信息
  getcode: '/apis/user/sendSmsCheckCode/', // 获取验证码
  checkmessagecode: '/apis/user/checkMessageCode/', // 验证验证码
  getHistoryMessage: '/apis/websocket/getHistoryMessage', // 聊天记录   get
  bindphone: '/apis/user/bondMobile/', // 绑定手机号
  getloanall: '/apis/loan/get', // 查询所有服务  post
  uploadimg: '/apis/user/uploadImg', // 上传图片
  getloanlist: '/apis/loan/listExpert', // 微金专家或本地专家列表
  addloanmark: '/apis/loan/mark/', // 添加关注顾问
  useradviser: '/apis/user/adviser/', // 顾问详情
  knowlist:'/apis/know/list/',//知识库
  knowid:'/apis/know/list/',//知识库id
  knowtype:'/apis/know/showType/',//知识库类别
  consulatanturl:'/apis/consultant/listById/',//查询顾问详情
  assessment:'/apis/consultant/listAll',//客户评价
  interesting:'/apis/loan/mark/',//添加关注
  getmyadvice: '/apis/loan/chatExpertPre', //我的咨询
  advisorylist: '/apis/advisory/list/',//咨询展示接口
  phoneandchat:"/apis/advisory/record/",
  judgecontent: "/apis/loan/advisoryComment/",
  worktogether:"/apis/user/teamwork/",//合伙人接口
  fastphone: "/apis/loan/loanIntent/",//快捷电话
  contryarea:"/apis/consultant/area/",//地区接口
  lunbo:"/apis/know/showLunbo/",//文字轮播
  zixun:"/apis/loan/getMarkLoan",
}