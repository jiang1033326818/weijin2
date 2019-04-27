// components/editableSelect/editable-select.js
/**
 * labelText: label文字信息
 * select-list: 下拉列表数据
 * select-key: 下拉框里显示信息对应的字段
 * lable-class: label对应的样式
 * input-class: input 输入框的样式
 * bindselectinputfocus: 输入框获取到焦点时执行的函数
 * bindselectinputblur: 输入框失去焦点时执行的函数
 * bindselectinputchange: 输入框改变时执行的函数
 * bindselect: 选中一个下拉项时执行的函数
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 表单名称
    name: {
      type: String,
      value: ''
    },
    // 默认值
    inputVal: {
      type: String,
      value: ''
    },
    // 预知内容
    placeHolder: {
      type: String,
      value: ''
    },
    // 选择的下拉选项列表
    selectList: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal, changePath) {

      }
    },
    // 下拉框里显示内容的key
    selectKey: {
      type: String,
      value: ''
    },
    labelText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,
    inputVal: '',
  },

  externalClasses: ['lable-class', 'input-class'], // 从外面继承的样式

  /**
   * 组件的方法列表
   */
  methods: {
    // selector 选择显示控制
    inputFocus: function (e) {
      this.setData({
        selectShow: true,
      });
      this.triggerEvent('selectinputfocus', e.detail);
    },

    inputBlur: function (e) {
      this.setData({
        selectShow: false,
      });
      this.triggerEvent('selectinputblur', e.detail);
    },

    // 输入改变
    inputChange: function (e) {
      this.setData({
        inputVal: e.detail.value,
      });
      this.triggerEvent('selectinputchange', e.detail);
    },

    // 选中选项
    itemClick: function (e) {
      console.log(e);
      const { item } = e.target.dataset;
      this.setData({
        inputVal: item[this.properties.selectKey]
      });
      this.triggerEvent('select', item);
    }
  }
})
