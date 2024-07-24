import request from "../utils/request";

/**
 * @description  : 获取分类列表
 * @param         {{type?:number[],pagenum?:number,pagesize?:number}} params
 * @return        {*}
 */
const catList = (params) => request.get("categories", { params });

/**
 * @description  : 添加分类
 * @param         {{cat_pid:number,cat_name:string,cat_level:number}} data
 * @return        {*}
 */
const addCat = (data) => request.post("categories", data);

/**
 * @description  : 查询分类
 * @param         {number} id
 * @return        {*}
 */
const selectCat = (id) => request.get(`categories/${id}`);

/**
 * @description  : 更新分类信息
 * @param         {number} id
 * @param         {{cat_name:string}} data
 * @return        {*}
 */
const updateCat = (id, data) => request.put(`categories/${id}`, data);

/**
 * @description  : 删除分类
 * @param         {number} id
 * @return        {*}
 */
const deleteCat = (id) => request.delete(`categories/${id}`);

export default {
  catList,
  addCat,
  selectCat,
  updateCat,
  deleteCat
};
