<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import orderApi from "../../api/order";
import moment from "moment";

const orderPageInfo = reactive({
  query: "",
  pagenum: 1,
  pagesize: 10,
  user_id: "",
  pay_status: "",
  is_send: "",
  order_fapiao_title: "",
  order_fapiao_company: "",
  order_fapiao_content: "",
  consignee_addr: "",
});
const orderList = ref([]);
const total = ref(0);
const dialogVisible = ref(false);
const stateVisible = ref(false);
const orderId = ref(0);
const orderUpdateInfo = reactive({
  is_send: "",
  order_pay: "",
  order_price: "",
  order_number: "",
  pay_status: "",
});

watch(
  [orderPageInfo],
  () => {
    getOrderList();
  },
  { deep: true }
);

const getOrderList = () => {
  orderApi.orderList(orderPageInfo).then((res) => {
    console.log(res);
    orderList.value = res.data.data.goods;
    total.value = res.data.data.total;
  });
};

onMounted(() => {
  getOrderList();
});

const editOrder = (row) => {
  orderId.value = row.order_id;
  orderUpdateInfo.is_send = row.is_send === "是" ? "1" : "0";
  orderUpdateInfo.order_pay = row.order_pay;
  orderUpdateInfo.order_price = row.order_price;
  orderUpdateInfo.order_number = row.order_number;
  orderUpdateInfo.pay_status = row.pay_status;
  stateVisible.value = true;
};

const updateOrder = () => {
  orderApi.updateOrder(orderId.value, orderUpdateInfo).then((res) => {
    console.log(res);
    getOrderList();
    stateVisible.value = false;
  });
};
</script>
<template>
  <div class="order">
    <div class="ipt" style="margin-bottom: 20px; display: flex">
      <el-input
        v-model="orderPageInfo.query"
        style="width: 300px; margin-right: 20px"></el-input>
      <el-button type="primary" @click="dialogVisible = true">筛选订单</el-button>
    </div>
    <el-table :data="orderList" border style="width: 100%" class="table" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="发货状态" width="100">
        <template #default="{ row }">
          {{ row.is_send === "是" ? "已发货" : "未发货" }}
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="100">
        <template #default="{ row }">
          {{ row.pay_status === "1" ? "已支付" : "未支付" }}
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="order_number" width="230"></el-table-column>
      <el-table-column
        label="发票"
        prop="order_fapiao_title"
        width="100"></el-table-column>
      <el-table-column label="订单价格" prop="order_price" width="100"></el-table-column>
      <el-table-column label="订单时间">
        <template #default="{ row }">
          {{ moment(row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="快递单号">
        <template #default="{ row }">
          {{ row.trade_no ? row.trade_no : "还没有快递" }}
          <a href="javascript:;">快递查询</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="EditPen"
            size="small"
            @click="editOrder(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev ,pager,next"
      v-model:total="total"
      v-model:page-size="orderPageInfo.pagesize"
      v-model:current-page="orderPageInfo.pagenum"
      style="margin-top: 20px"></el-pagination>
  </div>
  <el-dialog title="订单筛选" v-model="dialogVisible">
    <el-form :model="orderPageInfo">
      <el-form-item label="用户ID">
        <el-input v-model="orderPageInfo.user_id"></el-input>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-radio-group v-model="orderPageInfo.pay_status">
          <el-radio value="0">未支付</el-radio>
          <el-radio value="1">已支付</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发货状态">
        <el-radio-group v-model="orderPageInfo.is_send">
          <el-radio value="0">未发货</el-radio>
          <el-radio value="1">已发货</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发票">
        <el-radio-group v-model="orderPageInfo.order_fapiao_title">
          <el-radio value="个人">个人</el-radio>
          <el-radio value="公司">公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="orderPageInfo.order_fapiao_company"></el-input>
      </el-form-item>
      <el-form-item label="发票内容">
        <el-input v-model="orderPageInfo.order_fapiao_content"></el-input>
      </el-form-item>
      <el-form-item label="发货地址">
        <el-input v-model="orderPageInfo.consignee_addr"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
    </template>
  </el-dialog>

  <el-dialog title="订单状态更新" v-model="stateVisible">
    <el-form :model="orderUpdateInfo">
      <el-form-item label="发货状态">
        <el-radio-group v-model="orderUpdateInfo.is_send">
          <el-radio value="0">未发货</el-radio>
          <el-radio value="1">已发货</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-radio-group v-model="orderUpdateInfo.order_pay">
          <el-radio value="0">未支付</el-radio>
          <el-radio value="1">支付宝</el-radio>
          <el-radio value="2">微信</el-radio>
          <el-radio value="3">银行卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="订单价格">
        <el-input v-model="orderUpdateInfo.order_price"></el-input>
      </el-form-item>
      <el-form-item label="订单数量">
        <el-input v-model="orderUpdateInfo.order_number"></el-input>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-radio-group v-model="orderUpdateInfo.pay_status">
          <el-radio value="0">未支付</el-radio>
          <el-radio value="1">已支付</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="stateVisible = false">取消</el-button>
      <el-button type="primary" @click="updateOrder()"> 更新 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.order {
  padding: 20px;
  background: #fff;
}
</style>
