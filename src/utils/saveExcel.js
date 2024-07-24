/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-23
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-23
 * @FilePath     : \vue-manger\src\utils\saveExcel.js
 * @Description  :
 */
import ExportJsonExcel from "js-export-excel";

function JsonToExcel(fileName = "excel", data) {
  let option = {};
  option.fileName = fileName; //导出文件名
  option.datas = data;
  // option.datas = [
  //   // 一个对下是一个工作表
  //   {
  //     sheetData: infos, //JSON数据
  //     sheetName: "羽毛球训练", //excle表默认标签
  //     sheetFilter: ["name", "age", "sex", "weight"], //过滤字段
  //     sheetHeader: ["姓名", "年龄", "性别", "体重"] //标题头
  //   }
  // ];
  let toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
}

export default JsonToExcel;
