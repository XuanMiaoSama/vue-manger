/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-23
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-23
 * @FilePath     : \vue-manger\src\api\goods.js
 * @Description  :
 */
import request from "../utils/request";

/**
 * @description  : 获取商品列表
 * @param         {{query:string,pagenum:number,pagesize:number}} params
 * @return        {*}
 */
const goodsList = (params) => {
  return request({
    url: "goods",
    method: "get",
    params
  });
};

/**
 * @description  : 添加商品
 * @param         {{goods_name:string,goods_cat:string,goods_price:string,goods_number:number,goods_weight:number,goods_introduce:string,pics:{pic:string}[],attrs:{attr_id:number,attr_value:string}[]}} data
 * @return        {*}
 */
const addGoods = (data) => {
  return request({
    url: "goods",
    method: "post",
    data
  });
};

/**
 * @description  : 根据id查询商品
 * @param         {number|string} id
 * @return        {*}
 */
const selectGoods = (id) => {
  return request({
    url: `goods/${id}`
  });
};

/**
 * @description  : 更新商品信息
 * @param         {number|string} id
 * @param         {{goods_name:string,goods_cat:string,goods_price:string,goods_number:number,goods_weight:number,goods_introduce:string,pics:{pic:string}[],attrs:{attr_id:number,attr_value:string}[]}} data
 * @return        {*}
 */
const updateGoods = (id, data) => {
  return request({
    url: `goods/${id}`,
    method: "put",
    data
  });
};

/**
 * @description  : 删除商品
 * @param         {number|string} id
 * @return        {*}
 */
const deleteGoods = (id) => {
  return request({
    url: `goods/${id}`,
    method: "delete"
  });
};

export default {
  goodsList,
  addGoods,
  selectGoods,
  updateGoods,
  deleteGoods
};
